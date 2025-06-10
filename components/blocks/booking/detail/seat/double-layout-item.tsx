'use client';
import { Icon } from '#/components/icons';
import { Col } from '#/components/ui/col';
import { Row } from '#/components/ui/row';
import { Typography } from '#/components/ui/typography';
import { SeatConfiguration } from '#/types/vehicle';
import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#/components/headless/tooltip';
import { SeatPrice } from './seat-price';
import { cn } from '#/lib/utilities/cn';

export interface DoubleLayoutItemProps extends SeatConfiguration {}
const DoubleLayoutItem = ({ decks }: DoubleLayoutItemProps) => {
  return (
    // <div className="flex flex-col gap-10 lg:flex-row">
    <Row className="lg:grid-cols-6 lg:gap-x-4">
      {decks.map((deck, index) => (
        <Col
          className="bg-pj-grey-lightest col-span-full rounded-xl p-4 lg:col-span-3"
          key={index}
        >
          <Typography variant="small-label" className="text-center">
            {deck.deckId === 'lower' ? 'Tầng dưới' : 'Tầng trên'}
          </Typography>
          <div className="flex flex-col gap-y-2">
            {deck.rows.map((row, rowIndex) => {
              const driverSeat = row.seats.find(seat => seat.type === 'DRIVER');
              const otherSeats = row.seats.filter(
                seat => seat.type !== 'DRIVER',
              );

              return (
                <React.Fragment key={rowIndex}>
                  {/* Hàng riêng cho DRIVER */}
                  {deck.deckId === 'lower' && driverSeat && (
                    <Row className="grid-cols-3 lg:grid-cols-3">
                      <Col className="col-span-2">
                        <Icon name="seat" className="h-9 w-9" />
                      </Col>
                      <Col className="col-span-1">
                        <Typography asChild variant="sub-label">
                          <span>Entrance</span>
                        </Typography>
                      </Col>
                    </Row>
                  )}
                  <Row className="grid-cols-3 gap-2 lg:grid-cols-3">
                    {otherSeats.map((seat, seatIndex) => (
                      <Col key={seatIndex} className="col-span-1">
                        <Tooltip>
                          <TooltipTrigger
                            className={cn(
                              'hocus:fill-pj-green cursor-pointer',
                              seat.status === 'AVAILABLE' &&
                                'fill-pj-grey-light',
                              seat.status === 'RESERVED' && 'fill-pj-black',
                            )}
                          >
                            <Icon name="seat" className="h-9 w-9" />
                          </TooltipTrigger>
                          <TooltipContent className="bg-pj-blue-dark rounded-md px-3 py-1.5 text-white">
                            <SeatPrice
                              seatNunber={seat.number}
                              price="20.000"
                            />
                          </TooltipContent>
                        </Tooltip>
                      </Col>
                    ))}
                  </Row>
                </React.Fragment>
              );
            })}
          </div>
        </Col>
      ))}
    </Row>
  );
};

export { DoubleLayoutItem };
