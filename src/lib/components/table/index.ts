
export type Column = {
    accessor: string;
    header: string;
    cell?: any;
    cellEdit?: any;
    headerCell?: any,
    config?: {
        visible?: boolean,
        sortable?: boolean,
        disableHiding?: boolean,
        resizable?: boolean,
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
