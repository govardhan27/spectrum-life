import { GpContact } from "@generated/prisma/client";

export type GpContactCreateInput = {
  gpName: string;
  email: string;
  contactNumber?: string;
};

export type GpContactUpdateInput = Partial<GpContactCreateInput>;

export type GpContactResponse = GpContact;

export type GpContactListResponse = GpContact[];
