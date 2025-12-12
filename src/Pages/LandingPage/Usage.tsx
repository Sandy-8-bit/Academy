import { Card } from "../../Component/ui/card"

const cards = [
  {
    title: "Learn Directly From Industry Engineers",
    description:
      "Our curriculum is built and reviewed by working engineers, ensuring you learn the exact tools, workflows, and AI-powered practices used in real companies today."
  },
  {
    title: "Build Real-World Projects & Get Certified",
    description:
      "You won’t just watch lessons — you will build industry-grade projects that showcase your skills. Our certification validates your practical expertise for top tech roles."
  },
  {
    title: "Land Better Opportunities With Personalized Guidance",
    description:
      "From career mentoring to interview preparation, our experts guide you at every stage, helping you stand out and get job-ready with confidence."
  }
];


export function Usage() {
  return (
    <div className=" flex">
      {cards.map((card, i) => (
        <Card
          key={i}
          variant="gradient"
          title={card.title}
          description={card.description}
          className=" bg-background"
        />
      ))}
    </div>
  )
}
