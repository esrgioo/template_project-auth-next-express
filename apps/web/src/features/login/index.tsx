"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { LoginSchema } from "./schemas/LoginSchemas";
import useLogin from "@/hooks/api/auth/useLogin";
import Link from "next/link";

const LoginPage = () => {
  const { login, isLoading } = useLogin();
  console.log(isLoading);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      await login(values);
    },
  });
  return (
    <main className="flex h-screen items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="Your email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {!!formik.touched.email && !!formik.errors.email ? (
                  <p className="text-xs text-red-900">{formik.errors.email}</p>
                ) : null}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  type="password"
                  placeholder="Your password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {!!formik.touched.password && !!formik.errors.password ? (
                  <p className="text-xs text-red-900">
                    {formik.errors.password}
                  </p>
                ) : null}
              </div>
              <Link href="/forgot-password" className="text-right text-sm">
                Forgot Password ?
              </Link>
            </div>

            <Button className="mt-6 w-full" disabled={isLoading}>
              {isLoading ? "Loading.." : "Submit"}
            </Button>

            <Link href="/register" className="mt-4 flex justify-center text-sm">
              Don't have an account ? Register
            </Link>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default LoginPage;
