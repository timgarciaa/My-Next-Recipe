import { type NextRequest } from "next/server";
import { getIngredient, deleteIngredient, updateIngredient } from "@/utils/dbUtils";

export async function GET(request: NextRequest) {
  const id = Number(request.nextUrl.pathname.split("/")[3]);
  const ingredient = getIngredient(id);
  return Response.json(ingredient);
}

export async function PUT(request: NextRequest) {
  const id = Number(request.nextUrl.pathname.split("/")[3]);
  const body = await request.json();
  const ingredient = updateIngredient(id, body.name);
  return Response.json(ingredient);
}

export async function DELETE(request: NextRequest) {
  const id = Number(request.nextUrl.pathname.split("/")[3]);
  const ingredient = deleteIngredient(id);
  return Response.json(ingredient);
}
