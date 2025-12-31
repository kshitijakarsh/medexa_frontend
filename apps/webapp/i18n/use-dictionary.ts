// // i18n/use-dictionary.ts
// "use client";
// import { useContext } from "react";
// import { DictionaryContext } from "@/components/providers";

// export function useDictionary() {
//   return useContext(DictionaryContext);
// }

"use client"
import { useContext } from "react"
import { DictionaryContext } from "@/components/providers"

export function useDictionary() {
  const dict = useContext(DictionaryContext)

  if (!dict) {
    throw new Error("useDictionary must be used within <Providers>")
  }

  return dict
}
