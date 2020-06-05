import { Queue } from 'typescript-collections';

export function play(queue: Queue<string>) {
  if (!queue.peek()) {
    return;
  }

  const song = queue.dequeue();
}