import {z} from 'zod'
import {publicProcedure, t} from '../trpc'

export const placesRouter = t.router({
  all: publicProcedure.query(({ctx}) =>
    ctx.prisma.place.findMany({
      include: {
        resources: true
      }
    })
  ),
  get: publicProcedure
    .input(
      z.object({
        placeId: z.string()
      })
    )
    .query(({ctx, input: {placeId}}) =>
      ctx.prisma.place.findUnique({
        where: {
          id: placeId
        },
        include: {
          resources: true
        }
      })
    )
})
