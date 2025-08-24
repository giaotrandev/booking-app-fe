import { Icon } from '#/components/icons';
import { Col } from '#/components/ui/col';
import { Row } from '#/components/ui/row';
import { Typography } from '#/components/ui/typography';
import React from 'react';
import SeatItem from './seat-item';
import { cn } from '#/lib/utilities/cn';
import { SeatConfiguration } from '#/services/trip/trips-request';

export interface SeatLayoutProps extends SeatConfiguration {}
const SeatLayout = ({ decks }: SeatLayoutProps) => {
  if (!(Array.isArray(decks) && decks.length > 0)) return null;
  return (
    <Row className="gap-y-4 lg:grid-cols-6 lg:gap-x-4 lg:gap-y-0">
      {decks.map((deck, index) => (
        <Col
          className={cn(
            'bg-pj-grey-lightest col-span-full rounded-xl p-4',
            decks.length > 1 && 'lg:col-span-3',
          )}
          key={index}
        >
          {deck.deckId && (
            <Typography
              asChild
              variant="small-label"
              className="mb-3 text-center"
            >
              <p>
                {deck.deckId === 'lower'
                  ? decks.length > 1
                    ? 'Tang duoi'
                    : ''
                  : 'Tầng trên'}
              </p>
            </Typography>
          )}
          {Array.isArray(deck.rows) && deck.rows.length > 0 && (
            <div className="flex flex-col gap-y-5">
              {deck.rows.map((row, rowIndex) => {
                const driverSeat = row.seats?.find(
                  seat => seat.type === 'DRIVER',
                );
                const otherSeats = row.seats?.filter(
                  seat => seat.type !== 'DRIVER',
                );
                return (
                  <React.Fragment key={rowIndex}>
                    {deck.deckId === 'lower' && driverSeat && (
                      <Row className="grid-cols-3 lg:grid-cols-3">
                        {driverSeat && (
                          <Col className="col-span-1 flex justify-center">
                            <Icon
                              name="steering-wheel"
                              className={cn(
                                'h-auto max-w-50 min-w-13',
                                decks.length > 1
                                  ? 'w-[46%] md:w-[26%] lg:w-[26%]'
                                  : 'w-[46%] md:w-[26%] lg:w-[46%]',
                              )}
                            />
                          </Col>
                        )}
                        <Col className="col-span-1 col-start-3">
                          <div
                            className={cn(
                              'flex h-full items-center gap-x-1',
                              decks.length > 1
                                ? 'justify-between'
                                : 'justify-end',
                            )}
                          >
                            <Typography
                              asChild
                              variant="small-label"
                              className="lg:text-[12px]"
                            >
                              <span>Entrance</span>
                            </Typography>
                            <div className="h-full w-2 flex-none bg-black lg:w-px" />
                          </div>
                        </Col>
                      </Row>
                    )}
                    {Array.isArray(otherSeats) && otherSeats.length > 0 && (
                      <Row className="grid-cols-3 gap-5 lg:grid-cols-3">
                        {otherSeats.map((seat, seatIndex) => {
                          return (
                            <Col key={seatIndex} className="col-span-1">
                              {deck?.deckId && row?.rowId && (
                                <SeatItem
                                  id={seat.id}
                                  isHasUpperDeck={decks.length > 1}
                                  status={seat.status}
                                  number={seat.number}
                                  price={seat.price}
                                  deckId={deck.deckId}
                                  rowId={row.rowId}
                                />
                              )}
                            </Col>
                          );
                        })}
                      </Row>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </Col>
      ))}
    </Row>
  );
};

export { SeatLayout };
