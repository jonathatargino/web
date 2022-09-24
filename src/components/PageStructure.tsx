import { Component, ReactNode } from "react";
import { Logo } from "./Logo";

interface PageScructureProps {
    children: ReactNode
}

class PageStructure extends Component<PageScructureProps> {
    render(){
        return (
            <div className="max-w-[1344px] mx-auto flex flex-col items-center mt-5
             2xl:my-10">
                <Logo/>
                {this.props.children}
            </div>
        )
    }
}

export default PageStructure;