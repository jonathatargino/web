import { Component, ReactNode } from "react";

interface PageStructureProps {
    children: ReactNode
}

class Grid extends Component<PageStructureProps> {
    render(){
        return (
            <div className="grid grid-cols-1 gap-6 mt-10 mx-10
            sm:grid-cols-2
            md:grid-cols-3 
            xl:grid-cols-6"
            >
                {this.props.children}
            </div>
        )
    }
}

export default Grid;