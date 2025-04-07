import type { MetaRecord } from 'nextra'
 
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
  top: {
    title: "Top 100"
  },
  everyday: {
    title: 'Everyday Conversation'
  },
  genz: {
    title: "GEN Z / Internet Slang",
  },
  texting: {
    title: 'Texting & Social Media'
  },
  gaming: {
    title: 'Gaming'
  },
  work: {
    title: 'Workplace & Corporate'
  },
  car: {
    title: 'Car & Street'
  },
  money: {
    title: 'Money & Hustle'
  },
  top2025: {
    title: '2025 Most Used'
  },
};
 
export default meta;