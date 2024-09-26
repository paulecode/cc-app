import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

export const ChartCard: React.FC<{ children: React.ReactNode, title: string }> = ({ children, title }) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </div>
  )
}
