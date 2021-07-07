import {
  AnnotationIcon,
  HomeIcon,
  LibraryIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/solid"

export default function Tabs() {
  return (
    <div>
      {/* Tab Header */}
      <div className="space-x-6">
        <div className="pb-2 text-gray-500 inline-block">
          <ShieldExclamationIcon className="h-5 w-5 inline-block" />
          <span className="m-2 align-middle">生理衰退预警</span>
        </div>
        <div className="pb-2 text-blue-500 inline-block border-b-4 border-solid border-blue-500">
          <HomeIcon className="h-5 w-5 inline-block" />
          <span className="m-2 align-middle">住院时长预测（回归）</span>
        </div>
        <div className="pb-2 text-gray-500 inline-block">
          <LibraryIcon className="h-5 w-5 inline-block" />
          <span className="m-2 align-middle">住院时长预测（分类）</span>
        </div>
        <div className="pb-2 text-gray-500 inline-block">
          <AnnotationIcon className="h-5 w-5 inline-block" />
          <span className="m-2 align-middle">表型分类</span>
        </div>
      </div>
      <div className="border-b-2 border-solid border-gray-150"></div>

      {/* Tab Panes */}
      <div>hey</div>
    </div>
  )
}
