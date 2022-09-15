import { useEffect, useRef } from 'react'

export default function useInterval(callback: Function, delay?: number) {
  const callbackRef = useRef<Function>(() => {})

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const timerId = setInterval(() => callbackRef.current(), delay ?? 1000)
    return () => clearInterval(timerId)
  }, [delay])
}
