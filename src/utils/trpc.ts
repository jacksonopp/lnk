import { createReactQueryHooks } from "@trpc/react";
import { useState } from "react";
import { AppRouter } from "../pages/api/trpc/[trpc]"

export const trpc = createReactQueryHooks<AppRouter>();

export const useSetUrl = () => {
  const mutation = trpc.useMutation('create-url')

  const setUrl = async (url: string) => {
    console.log('setting', url)
    const result = await mutation.mutateAsync({url})
    console.log(result)
    return result
  }


  return {setUrl, loading: mutation.isLoading, success: mutation.isSuccess}
}