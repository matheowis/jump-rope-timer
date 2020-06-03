export type TSnackbarType = 'error' | 'warning' | 'info' | 'success';

export interface ISnackbarProps {
  type: TSnackbarType
  text: string
}
export interface ISnackbarObject {
  ref: React.RefObject<HTMLDivElement>
  createdAt: number
  type?: TSnackbarType
  text: string
  timeoutId: NodeJS.Timeout
}