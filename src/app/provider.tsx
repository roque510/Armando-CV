"use client"

import { Provider } from "@/components/ui/provider"

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <Provider>
      {props.children}
    </Provider>
  )
}