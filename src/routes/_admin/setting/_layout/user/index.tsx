import data from '@/data/user'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EmailIcon from '@mui/icons-material/Email'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import { GridColDef } from '@mui/x-data-grid'
import { DataGrid } from '@mui/x-data-grid/DataGrid'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/setting/_layout/user/')({
  component: RouteComponent,
})

function RouteComponent() {
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      sortable: false,
      disableColumnMenu: true,
      width: 220,
    },
    {
      field: 'username',
      headerName: 'Username',
      sortable: false,
      disableColumnMenu: true,
      width: 100,
    },
    {
      field: 'email',
      headerName: 'Email',
      sortable: false,
      disableColumnMenu: true,
      width: 250,
    },
    {
      field: 'status',
      headerName: 'Status',
      sortable: false,
      disableColumnMenu: true,
      width: 100,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      getActions(params) {
        return [
          <Link to={`/setting/user/${params?.id}`}>
            <IconButton size="small">
              <MoreVertIcon />
            </IconButton>
          </Link>,
          <IconButton size="small">
            <DeleteOutlineIcon />
          </IconButton>,
        ]
      },
    },
  ]

  return (
    <Card>
      <CardHeader
        title="User"
        action={<Button startIcon={<EmailIcon />}>Invite new user</Button>}
      />
      <DataGrid columns={columns} rows={data} hideFooter rowSelection={false} />
    </Card>
  )
}
