import { useRouter } from "next/router";
import Image from "next/image";

import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { Card, CardContent } from "../components/ui/card";
import VoiceChat from "../components/VoiceChat";
import { createWebAgent } from "@/lib/bland";
import { slides } from "../data/slides";
import ImageMax from '@/images/maxCall.jpg';
import IconPhone from "@/icons/icon-phone.svg";

export default function HomePage() {
  const router = useRouter();

  const [agentId, setAgentId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAgent = async () => {
      setIsLoading(true);
      try {
        const response = await createWebAgent();
        if (!response.agent?.agent_id) {
          throw new Error("Failed to create web agent");
        }
        setAgentId(response.agent.agent_id);
      } catch (err) {
        console.error("Agent creation error:", err);
        setError(err instanceof Error ? err.message : "Failed to create agent");
      } finally {
        setIsLoading(false);
      }
    };

    initAgent();
  }, []);
  /*
  useEffect(() => {
    const initAgent = async () => {
      setIsLoading(true);
      try {
        setAgentId("dd1203de-0a62-4fec-bf32-f044986ccb29");
      } catch (err) {
        console.error("Agent creation error:", err);
        setError(err instanceof Error ? err.message : "Failed to create agent");
      } finally {
        setIsLoading(false);
      }
    };

    initAgent();
  }, []);
*/
  // useEffect(() => {
  //   if (!router.isReady) return;

  //   const agentFromQuery = router.query.agent_id;

  //   if (typeof agentFromQuery === "string") {
  //     setAgentId(agentFromQuery);
  //   } else {
  //     setError("Missing or invalid 'agent_id' in URL.");
  //   }

  //   setIsLoading(false);
  // }, [router.isReady, router.query.agent_id]);

  const agent = slides.find((slide) => slide.id === agentId);

  useEffect(() => {
    const onUnload = () => {
      if (window.opener) {
        window.opener.postMessage("call-ended", "*");
      }
    };
    window.addEventListener("unload", onUnload);

    return () => {
      window.removeEventListener("unload", onUnload);
    };
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="main-container">
<div className="call-container">
      <div className="phone-call-user-container">
        <div className="phone-call-user-photo">
          <Image className="" src={ImageMax} alt="My Icon" />
        </div>

        <div className="phone-user-glow01">#</div>
        <div className="phone-user-glow02">#</div>
        <div className="phone-user-glow03">#</div>
      </div>
 <div className="phone-call-text">
            <h2>Max Lee</h2>
            <p className="call-status-connected">
              Connected
            </p>
             <p className="phone-call-time">0:00</p>
            <div className="user-visual-analyser">
           
            </div>
          </div>

      <div className="hang-up-button-container">
        <button
          type="button"
          className="btn-phone-hangup"
          onClick={() => handleStartCall(slides[activeIndex].id)}
        >
          <Image className="button-icon-phone" src={IconPhone} alt="My Icon" />
        </button>
      </div>

</div>
      <div className="background-dots"></div>
    </div>
    
  );
}
