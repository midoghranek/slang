import type { MetaRecord } from "nextra";

/**
 * type MetaRecordValue =
 *  | TitleSchema
 *  | PageItemSchema
 *  | SeparatorSchema
 *  | MenuSchema
 *
 * type MetaRecord = Record<string, MetaRecordValue>
 **/
const meta: MetaRecord = {
  index: "Introduction",
  top: "Top 100",
  everyday: "Everyday Conversation",
  genz: "GEN Z / Internet Slang",
  texting: "Texting & Social Media",
  gaming: "Gaming",
  work: "Workplace & Corporate",
  car: "Car & Street",
  money: "Money & Hustle",
  top2025: "2025 Most Used",
  vocabulary: {
    title: "Vocabulary",
    items: {
      a1: "A1 Vocabulary",
      c1: "C1 Vocabulary",
    },
  },
};

export default meta;
