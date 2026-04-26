import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PaymentSuccessPage() {
  return (
    <Card className="border-navy-200 text-center">
      <CardHeader className="pb-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <CardTitle className="mt-4 text-2xl text-navy-700">
          Your letters are being delivered!
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-navy-600">
          Each official will receive a personalized, citation-backed letter
          addressing your civic concern.
        </p>
        <p className="text-sm text-navy-400">
          You will receive email updates as each letter is delivered. Most
          letters arrive within 1-2 business days.
        </p>
      </CardContent>
      <CardFooter className="flex-col gap-3 pt-2">
        <Button
          asChild
          className="w-full bg-gold-500 text-navy-800 hover:bg-gold-400 font-semibold"
          size="lg"
        >
          <Link href="/dashboard">Track Delivery Status</Link>
        </Button>
        <Button asChild variant="outline" className="w-full" size="lg">
          <Link href="/submit">Submit Another Issue</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
