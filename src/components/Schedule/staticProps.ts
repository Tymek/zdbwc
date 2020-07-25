import { GetStaticProps } from 'next'
import { precacheQuery } from 'utils/graphql'
import SCHEDULE from './gql/schedule.gql'

const getStaticProps: GetStaticProps = precacheQuery({ query: SCHEDULE })

export default getStaticProps
