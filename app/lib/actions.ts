// <form action={function} children=...>
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import db from './db';
import { handleError } from './utils';
import { signIn } from '@/auth';

const InvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateInvoice = InvoiceSchema.omit({ id: true, date: true });
const UpdateInvoice = InvoiceSchema.omit({ date: true });

export async function createInvoice(formData: FormData) {
  const rawFormData = {
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  };

  const { customerId, amount, status } = CreateInvoice.parse(rawFormData);
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await db.query(
      `
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES ($1, $2, $3, $4)
      `,
      [customerId, amountInCents, status, date]
    );
  } catch (error) {
    return handleError(error, 'Failed to create invoice.');
  }

  revalidatePath('/dashboard/invoices');
  // Redirect internamente lança um erro para o framework
  // Assim, colocamos fora do try-catch que trata erro de BD
  redirect('/dashboard/invoices');
}

export async function updateInvoice(formData: FormData) {
  // Aqui nada de autenticação ou verificação de token CSRF por enquanto
  const { id, customerId, amount, status } = UpdateInvoice.parse({
    id: formData.get('id'),
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;

  try {
    await db.query(
      `
        UPDATE invoices
        SET customer_id = $1, amount = $2, status = $3
        WHERE id = $4
      `,
      [customerId, amountInCents, status, id]
    );
  } catch (error) {
    return handleError(error, 'Failed to update invoice.');
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(formData: FormData) {
  const id = formData.get('id')?.toString();
  
  try {
    //throw new Error('faiô o trem')
    await db.query(`DELETE FROM invoices WHERE id = $1`, [id]);
  } catch (error) {
    return handleError(error, 'Failed to delete invoice.');
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    const message = (error as Error).message;

    if (message.includes('CredentialsSignin')) {
      return 'CredentialSignin';
    }

    if (message === 'NEXT_REDIRECT') {
      throw error;
    }

    return handleError(error, 'Failed to authenticate');
  }
}
