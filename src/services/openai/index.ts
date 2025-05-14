import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { ConversationSummaryMemory } from 'langchain/memory';
import { LLMChain } from 'langchain/chains';
import { PromptTemplate } from 'langchain/prompts';
import { BaseLanguageModel } from 'langchain/dist/base_language';

interface IGeminiRequest {
  handleStream: (token: string) => void;
  handleStreamEnd: (token: string) => void;
  handleStreamStart?: () => void;
  prompt?: any;
  GeminiParams?: any;
}

export const GeminiRequest = ({
  handleStream,
  handleStreamEnd,
  handleStreamStart,
  prompt,
  GeminiParams,
}: IGeminiRequest) => {
  // Sử dụng ChatGoogleGenerativeAI trực tiếp
  const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    modelName: 'gemini-2.5-flash-preview-04-17', // Sử dụng model name chính xác
    temperature: 0.3,
    streaming: true,
    callbacks: [
      {
        handleLLMNewToken(token: string) {
          handleStream(token);
        },
        handleLLMEnd(output: any) {
          handleStreamEnd(
            typeof output === 'string' ? output : JSON.stringify(output)
          );
        },
        handleLLMStart() {
          if (handleStreamStart) {
            handleStreamStart();
          }
          return;
        },
      },
    ],
    ...GeminiParams,
  }) as unknown as BaseLanguageModel;

  const chain = new LLMChain({ llm: model, prompt });
  return {
    chain,
  };
};

export const GeminiRequestNotStream = ({ prompt }: IGeminiRequest) => {
  // Sử dụng ChatGoogleGenerativeAI trực tiếp
  const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    modelName: 'gemini-2.5-flash-preview-04-17', // Sử dụng model name chính xác
    temperature: 0.3,
  }) as unknown as BaseLanguageModel;

  const chain = new LLMChain({ llm: model, prompt });
  return {
    chain,
  };
};

export const GeminiRequestWithMemory = ({
  handleStream,
  prompt,
  GeminiParams,
}: IGeminiRequest) => {
  // Sử dụng ChatGoogleGenerativeAI trực tiếp
  const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    modelName: 'gemini-1.5-flash', // Sử dụng model name chính xác
    temperature: 0.3,
    streaming: true,
    callbacks: [
      {
        handleLLMNewToken(token: string) {
          handleStream(token);
        },
      },
    ],
    ...GeminiParams,
  }) as unknown as BaseLanguageModel;

  const memory = new ConversationSummaryMemory({
    memoryKey: 'chat_history',
    llm: model,
  });

  const chain = new LLMChain({ llm: model, prompt, memory });
  return {
    memory,
    chain,
  };
};
