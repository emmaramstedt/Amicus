"use client";
import { Form, Button, Spinner } from "react-bootstrap";
import { useState } from "react";

export default function Home() {
  const [quote, setQuote] = useState("");
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteLoadingError, setQuoteLoadingError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const prompt = formData.get("prompt")?.toString().trim();

    if (prompt) {
      try {
        setQuote("");
        setQuoteLoadingError(false);
        setQuoteLoading(true);

        const response = await fetch(
          "/api/openai?prompt=" + encodeURIComponent(prompt)
        );
        const body = await response.json();
        setQuote(body.quote);
      } catch (error) {
        console.error(error);
        setQuoteLoadingError(true);
      } finally {
        setQuoteLoading(false);
      }
    }
  }

  return (
    <>
      <h1>Amicus</h1>
      <div>Enter a text</div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="prompt-input">
          <Form.Label>Write something to say</Form.Label>
          <Form.Control name="prompt" maxLength={100} />
        </Form.Group>
        <Button type="submit" className="mb-3" disabled={quoteLoading}>
          Send
        </Button>
      </Form>
      {quoteLoading && <Spinner animation="border" />}
      {quoteLoadingError && "Something went wrong. Please try again."}
      {quote && <h5>{quote}</h5>}
    </>
  );
}
