import { useRouter } from "next/router";
import { app, auth, loginAsGuest } from "../library/firebase";
import { getCheckoutUrl } from "./stripePayment";

export default function SubscribeButton({ priceId }: { priceId: string }) {
  const router = useRouter();

  const checkout = async () => {
    if (!auth.currentUser) {
      await loginAsGuest();
    }

    const url = await getCheckoutUrl(app, priceId);
    router.push(url);
  };

  return <button onClick={checkout}>Continue</button>;
}
