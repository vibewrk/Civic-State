import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PaymentCancelPage() {
  return (
    <Card className="border-navy-200 text-center">
      <CardHeader className="pb-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-navy-100">
          <svg
            className="h-8 w-8 text-navy-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <CardTitle className="mt-4 text-2xl text-navy-700">
          Payment Cancelled
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-navy-600">
          Your letters are saved — return anytime to complete payment and have
          them delivered.
        </p>
        <p className="text-sm text-navy-400">
          No charges were made. Your drafted letters will remain available.
        </p>
      </CardContent>
      <CardFooter className="pt-2">
        <Button
          asChild
          className="w-full bg-gold-500 text-navy-800 hover:bg-gold-400 font-semibold"
          size="lg"
        >
          <Link href="/submit">Return to Submission</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
