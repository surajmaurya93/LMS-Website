import { Menu, School } from 'lucide-react'
import React, { useEffect } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import DarkMode from '@/DarkMode';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from './ui/sheet';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useLogoutUserMutation } from '@/features/api/authApi';
import { useSelector } from 'react-redux';

const NavBar = () => {
    const { user } = useSelector(store => store.auth);
    const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        await logoutUser();
    }

    // console.log(user)

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || "User logout.");
            navigate("/login");
        }
    }, [isSuccess])


    return (
        <div className="h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
            {/* Desktop Screen*/}
            <div className='max-w-6xl mx-auto hidden justify-between items-center gap-10 h-full md:flex'>
                <div className='flex items-center gap-2'>
                    <School size={"27"} />
                    <Link to="/"><h1 className='hidden md:block font-extrabold text-2xl'>Ede-<span className='text-blue-700'>Techy</span></h1></Link>
                </div>
                {/* User Icons And Dark Mode Icons */}
                <div className='flex items-center gap-6'>
                    {
                        user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Avatar>
                                        <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem><Link to="my-learning">My Learning</Link></DropdownMenuItem>
                                        <DropdownMenuItem><Link to="profile">Edit Profile</Link></DropdownMenuItem>
                                        <DropdownMenuItem onClick={logoutHandler}>Log out</DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    {user?.role === "instructor" && (
                                        <>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem><Link to="/admin/dashboard">Dashboard</Link></DropdownMenuItem>
                                        </>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className='flex items-center gap-2'>
                                <Button variant="outline" onClick={() => navigate("/login")}>Login</Button>
                                <Button onClick={() => navigate("/login")}>Signup</Button>
                            </div>
                        )
                    }
                    <DarkMode />
                </div>
            </div>

            {/* Mobile Screen */}
            <div className='flex md:hidden items-center justify-between px-4 h-full'>
                <h1 className='font-extrabold text-2xl'><Link to="/">E-Learning</Link></h1>
                <MobileNavbar user={user} />
            </div>
        </div>
    );
};

export default NavBar;


const MobileNavbar = ({ user }) => {
    const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
    const navigate = useNavigate();
    const role = "instructor";

    const logoutHandler = async () => {
        await logoutUser();
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || "User logout.");
            navigate("/login");
        }
    }, [isSuccess])

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size='icon' className="rounded-full  hover:bg-gray-200" variant="outline">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader className="flex flex-row items-center justify-between mt-6">
                    <SheetTitle className="font-bold text-2xl"><Link to="/">E-Learning</Link></SheetTitle>
                    <DarkMode />
                </SheetHeader>
                <Separator className='mr-5' />
                <nav className='flex flex-col space-y-3'>
                    <Link to="/my-learning">My Learning</Link>
                    <Link to="/profile">Edit Profile</Link>
                    <Link onClick={logoutHandler}>Logout</Link>
                </nav>
                {
                    user?.role === "instructor" && (
                        <SheetFooter>
                            <Button type="submit" onClick={() => navigate("/admin/course")}>Courses</Button>
                            <SheetClose asChild>
                                <Button className="mb-3 mt-2" type="submit" onClick={() => navigate("/admin/dashboard")}>Dashboard</Button>
                            </SheetClose>
                        </SheetFooter>
                    )
                }
            </SheetContent>
        </Sheet>
    )
}
