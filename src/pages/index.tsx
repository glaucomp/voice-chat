import { createWebAgent } from "@/lib/bland";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { Card, CardContent } from "../components/ui/card";
import VoiceChat from "../components/VoiceChat";

export default function HomePage() {
  //const router = useRouter();

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
  /*
  useEffect(() => {
    if (!router.isReady) return;

    const agentFromQuery = router.query.agent_id;

    if (typeof agentFromQuery === "string") {
      setAgentId(agentFromQuery);
    } else {
      setError("Missing or invalid 'agent_id' in URL.");
    }

    setIsLoading(false);
  }, [router.isReady, router.query.agent_id]);
*/
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
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto space-y-6">
        {error ? (
          <Card className="bg-white/10 backdrop-blur-lg border-none">
            <CardContent className="p-6">
              <div className="text-red-300/90 text-center font-light p-4 rounded-2xl bg-red-500/10">
                {error}
              </div>
            </CardContent>
          </Card>
        ) : !agentId ? (
          <Card className="bg-white/10 backdrop-blur-lg border-none">
            <CardContent className="p-6">
              <div className="text-white/70 text-center font-light p-4">
                <div className="animate-pulse">Initializing...</div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <VoiceChat agentId={agentId} />
        )}
      </div>
    </main>
  );
}
