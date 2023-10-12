import {eventRouter} from 'server/routers/event'
import {placesRouter} from 'server/routers/places'
import {speakerRouter} from 'server/routers/speaker'
import {userRouter} from 'server/routers/user'
import {publicProcedure, t} from '../trpc'

export const appRouter = t.router({
  event: eventRouter,
  places: placesRouter,
  speaker: speakerRouter,
  user: userRouter,
  i18n: publicProcedure.query(({ctx}) => ({
    i18n: ctx.i18n,
    locale: ctx.locale
  }))
})
