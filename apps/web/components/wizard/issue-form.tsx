"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface IssueFormProps {
  data: {
    issueDescription: string;
    desiredOutcome: string;
  };
  onChange: (updates: Partial<IssueFormProps["data"]>) => void;
  onNext: () => void;
}

export function IssueForm({ data, onChange, onNext }: IssueFormProps) {
  const issueValid =
    data.issueDescription.length >= 10 && data.issueDescription.length <= 5000;
  const outcomeValid =
    data.desiredOutcome.length >= 10 && data.desiredOutcome.length <= 2000;
  const canProceed = issueValid && outcomeValid;

  return (
    <Card className="border-navy-200">
      <CardHeader>
        <CardTitle className="text-navy-700">What is your concern?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Issue description */}
        <div className="space-y-2">
          <Label htmlFor="issue" className="text-navy-600">
            Describe the issue you care about
          </Label>
          <Textarea
            id="issue"
            placeholder="Describe the civic issue you want to address. Be specific about what concerns you and any relevant details..."
            value={data.issueDescription}
            onChange={(e) => onChange({ issueDescription: e.target.value })}
            rows={6}
            maxLength={5000}
            className="resize-y"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>
              {data.issueDescription.length < 10
                ? `${10 - data.issueDescription.length} more characters needed`
                : "Looks good"}
            </span>
            <span>{data.issueDescription.length}/5,000</span>
          </div>
        </div>

        {/* Desired outcome */}
        <div className="space-y-2">
          <Label htmlFor="outcome" className="text-navy-600">
            What outcome would you like to see?
          </Label>
          <Textarea
            id="outcome"
            placeholder="Describe the change you want. What specific action should officials take?"
            value={data.desiredOutcome}
            onChange={(e) => onChange({ desiredOutcome: e.target.value })}
            rows={4}
            maxLength={2000}
            className="resize-y"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>
              {data.desiredOutcome.length < 10
                ? `${10 - data.desiredOutcome.length} more characters needed`
                : "Looks good"}
            </span>
            <span>{data.desiredOutcome.length}/2,000</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <Button
          onClick={onNext}
          disabled={!canProceed}
          className="bg-navy-700 hover:bg-navy-600"
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
