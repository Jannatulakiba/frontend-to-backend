
"use client";

import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

const AddProductForm = () => {
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.text();

      if (!res.ok) {
        throw new Error(result || "Request failed");
      }

      console.log("Success:", result);
      console.log("Submitted data:", data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Add product</CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Product name</Label>
              <Input
                id="name-1"
                name="name"
                defaultValue="Pedro Duarte"
                required
              />
            </Field>

            <Field>
              <Label htmlFor="username-1">Username</Label>
              <Input
                id="username-1"
                name="username"
                defaultValue="@peduarte"
                required
              />
            </Field>
          </FieldGroup>

          <Button type="submit">Add product</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddProductForm;
