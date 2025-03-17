import { LineChart, PageHeading } from '@gertrude/sentinel';
import { createFileRoute } from '@tanstack/solid-router';
import { Component } from 'solid-js';

export const Route = createFileRoute('/')({
  component: () => <OverviewPage />,
});

const OverviewPage: Component = () => {
  return (
    <div class="">
      <PageHeading>Overview</PageHeading>
      <div class="h-80 border">hi hi</div>
    </div>
  );
};
