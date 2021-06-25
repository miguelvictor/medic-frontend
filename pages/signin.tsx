import { useState, useCallback } from "react"
import { LockClosedIcon } from "@heroicons/react/solid"

import { useAuthJwt } from "../api/auth"

export default function About() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [_, setToken] = useAuthJwt()

  const onUsernameChange = useCallback(
    (e) => setUsername(e.target.value),
    [setUsername]
  )
  const onPasswordChange = useCallback(
    (e) => setPassword(e.target.value),
    [setPassword]
  )
  const onSignin = useCallback(async (e) => {
    e.preventDefault()
    console.log("login")
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="/project-logo.png"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            登录
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            没有账号, 请联系管理员申请
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSignin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Email address
              </label>
              <input
                id="username"
                name="username"
                type="username"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="用户名"
                value={username}
                onChange={onUsernameChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="密码"
                value={password}
                onChange={onPasswordChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              登录
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
