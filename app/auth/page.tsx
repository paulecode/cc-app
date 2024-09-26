import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RegisterForm } from './_components/registerForm/registerForm'
import { LoginForm } from './_components/loginForm/loginForm'

export default function AuthPage() {
    return (
        <div>
            <Card className="p-2">
                <CardHeader>
                    <CardTitle>Classifying classic</CardTitle>
                    <CardDescription>Sign up or sign in</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="login" className="flex flex-col gap-4">
                        <TabsList className="w-full">
                            <TabsTrigger value="register" className="w-full">
                                Register
                            </TabsTrigger>
                            <TabsTrigger value="login" className="w-full">
                                Login
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="register">
                            <RegisterForm />
                        </TabsContent>
                        <TabsContent value="login">
                            <LoginForm />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
