import React, { FC, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Tabs,
  Tab,
} from '@material-ui/core'
import { RootState } from '../store/configureStore'
import {
  getDeals,
  clearData,
  changeDealStatus,
  cancelDealRequest,
} from '../store/slices/dealsSlice'
import { renter, landlord } from '../static'
import DealActionButtons from '../components/DealActionButtons'
import { statusConverter } from '../utils/helpers'
import ContentWrapper from '../components/ContentWrapper'

const Deals: FC = () => {
  const dispatch = useDispatch()

  // 0 - landlord
  // 1 - renter
  const [value, setValue] = React.useState(0)

  const {
    renterDeals,
    landlordDeals,
    dealsErrorMessage,
    dealsLoading,
    dealsLoadingSuccess,
  } = useSelector((state: RootState) => state.deals)

  useEffect((): (() => void) => {
    if (value === 0) {
      dispatch(getDeals(landlord))
    } else if (value === 1) {
      dispatch(getDeals(renter))
    }

    return () => dispatch(clearData())
  }, [value, dispatch, getDeals, clearData])

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  // get new status, role
  const changeDealStatusCallback = ({ dealId, landlordId }) => {
    dispatch(
      changeDealStatus({
        typeOfDeal: 'landlordDeals',
        dealId,
        landlordId,
        newStatus: 'ACTIVE',
      })
    )
  }

  const cancelDealRequestCallback = ({
    dealId,
    role,
  }: {
    dealId: number
    role: 'landlord' | 'renter'
  }) => {
    dispatch(
      cancelDealRequest({
        role,
        dealId,
      })
    )
  }

  return (
    <Container component="main" maxWidth="md">
      <Box mt={3} mb={3}>
        <Typography variant="h2" component="h1" color="primary">
          Сделки
        </Typography>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            indicatorColor="primary"
            centered
          >
            <Tab label="Сдаю" {...a11yProps(0)} />
            <Tab label="Арендую" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ContentWrapper
            isLoading={dealsLoading}
            errorMessage={dealsErrorMessage}
            isEmpty={!landlordDeals.length && dealsLoadingSuccess}
            contentGeneratorCallback={() =>
              landlordDeals.map((deal) =>
                cardGenerator({
                  role: 'landlord',
                  deal,
                  changeDealStatusCallback,
                  cancelDealRequestCallback,
                })
              )
            }
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ContentWrapper
            isLoading={dealsLoading}
            errorMessage={dealsErrorMessage}
            isEmpty={!renterDeals.length && dealsLoadingSuccess}
            contentGeneratorCallback={() =>
              renterDeals.map((deal) =>
                cardGenerator({
                  role: 'renter',
                  deal,
                  changeDealStatusCallback,
                  cancelDealRequestCallback,
                })
              )
            }
          />
        </TabPanel>
      </Box>
    </Container>
  )
}

// TODO добавить даты аренды
function cardGenerator({
  deal,
  changeDealStatusCallback,
  cancelDealRequestCallback,
  role,
}) {
  const typeOfDeal = role === 'landlord' ? 'landlordDeals' : 'renterDeals'
  return (
    <Box mt={5}>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Название: {deal.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Цена: {deal.price}₽
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Статус: {statusConverter(deal.status)}
          </Typography>
          <DealActionButtons
            role={role}
            changeDealStatusCallback={() =>
              changeDealStatusCallback({
                dealId: deal.id,
                landlordId: deal.landlordId,
              })
            }
            cancelDealRequestCallback={() =>
              cancelDealRequestCallback({ dealId: deal.id, role })
            }
          />
        </CardContent>
      </Card>
    </Box>
  )
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default Deals
