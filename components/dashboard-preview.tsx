import Image from "next/image"

export function DashboardPreview() {
  return (
    <div className="w-full md:w-[1010px]">
      <div className="bg-primary-light/50 rounded-2xl p-2 shadow-2xl">
        <Image
          src="/images/dashboard-preview.png"
          alt="Dashboard preview"
          width={960}
          height={525}
          className="w-full h-full object-cover object-top rounded-xl shadow-lg"
        />
      </div>
    </div>
  )
}
