import { Worker, Job } from "bullmq";
import { connection } from "./redis-client";
import { handler } from "./handler";

const worker = new Worker(
  "import-properties",
  async (job: Job) => {
    console.log("Received job...");

    await handler(job.data);
  },
  { connection, removeOnComplete: { count: 5 } },
);

export default worker;
