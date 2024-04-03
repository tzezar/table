type ClassFunction = (props: { row: any; column: Column }) => string;


export type Column = {
    accessor: string;
    header?: string,
    head?: {
        component?: any,
        class?: string
    },
    cell?: {
        component?: any,
        componentEditable?: any,
        simplified?: (props: { row: any; column: Column, value: string | number | any, rowIndex: number }) => string,
        class?: string | ClassFunction
    },
    config?: {
        visible?: boolean,
        sortable?: boolean,
        disableHiding?: boolean,
        resizable?: boolean,
        moveable?: boolean,
        size?: {
            w?: number,
            minW?: number,
            maxW?: number,
        },
        align?: "left" | "right" | "center",

    },
    extra?: any
};

export type Columns = Column[];

export type CellProps = {
    value: unknown,
    column: Column,
    row: any,
    rowIndex: number
}

export type HeaderCellProps = {
    column: Column
}



export type SortingElement = {
    accessor: string,
    direction: 'ASC' | 'DESC' | ""
}


export type ColumnClassNames = {
    table: () => string;
    th: () => string;
    row: (row: any) => string;
    cell: (row: any, column: Column) => string;
};




export type Filter = {
    column: string,
    operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'between' | 'notBetween' | 'like' | 'ilike' | 'notIlike' | 'not' | 'inArray' | "",
    value: string | number
}
