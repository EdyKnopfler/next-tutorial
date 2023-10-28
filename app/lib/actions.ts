// <form action={function} children=...>
'use server';

import { z } from 'zod';

import db from './db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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

  await db.query(
    `
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES ($1, $2, $3, $4)
    `,
    [customerId, amountInCents, status, date]
  );

  revalidatePath('/dashboard/invoices');
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

  await db.query(
    `
      UPDATE invoices
      SET customer_id = $1, amount = $2, status = $3
      WHERE id = $4
    `,
    [customerId, amountInCents, status, id]
  );

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(formData: FormData) {
  const id = formData.get('id')?.toString();
  await db.query(`DELETE FROM invoices WHERE id = $1`, [id]);
  revalidatePath('/dashboard/invoices');
}