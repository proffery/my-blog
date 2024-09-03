import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import clsx from 'clsx'

import s from './table.module.scss'

export const Table = forwardRef<HTMLTableElement, ComponentPropsWithoutRef<'table'>>(
  ({ className, ...rest }, ref) => {
    const classNames = {
      table: clsx(s.table, className),
    }

    return <table className={classNames.table} {...rest} ref={ref}></table>
  }
)

export const TableHead = forwardRef<ElementRef<'thead'>, ComponentPropsWithoutRef<'thead'>>(
  ({ className, ...rest }, ref) => {
    const classNames = {
      tableHead: clsx(s.tableHead, className),
    }

    return <thead className={classNames.tableHead} {...rest} ref={ref}></thead>
  }
)

export const TableBody = forwardRef<ElementRef<'tbody'>, ComponentPropsWithoutRef<'tbody'>>(
  ({ className, ...rest }, ref) => {
    const classNames = {
      tableBody: clsx(s.tableBody, className),
    }

    return <tbody className={classNames.tableBody} {...rest} ref={ref}></tbody>
  }
)

export const TableRow = forwardRef<ElementRef<'tr'>, ComponentPropsWithoutRef<'tr'>>(
  ({ className, ...rest }, ref) => {
    const classNames = {
      tableRow: clsx(s.tableRow, className),
    }

    return <tr className={classNames.tableRow} {...rest} ref={ref}></tr>
  }
)

export const TableHeadCell = forwardRef<ElementRef<'th'>, ComponentPropsWithoutRef<'th'>>(
  ({ className, ...rest }, ref) => {
    const classNames = {
      tableHeadCell: clsx(s.headCell, className),
    }

    return <th className={classNames.tableHeadCell} {...rest} ref={ref}></th>
  }
)

export const TableBodyCell = forwardRef<ElementRef<'td'>, ComponentPropsWithoutRef<'td'>>(
  ({ className, ...rest }, ref) => {
    const classNames = {
      tableBodyCel: clsx(s.bodyCell, className),
    }

    return <td className={classNames.tableBodyCel} {...rest} ref={ref}></td>
  }
)
