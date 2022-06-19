import { createReactQueryHooks } from "@trpc/react";
import { add, minutesToSeconds } from "date-fns";
import { AppRouter } from "../pages/api/trpc/[trpc]"

export const trpc = createReactQueryHooks<AppRouter>();

export const useSetUrl = () => {
  const mutation = trpc.useMutation('create-url')

  const setUrl = async (url: string, ttl: number) => {
    console.log('setting', url)
    const expiry = minutesToSeconds(ttl)
    console.log(expiry)
    const result = await mutation.mutateAsync({url, expiry})
    console.log(result)
    return result
  }


  return {setUrl, loading: mutation.isLoading, success: mutation.isSuccess, error: mutation.isError}
}