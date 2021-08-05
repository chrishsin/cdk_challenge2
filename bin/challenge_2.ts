#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { StandardService } from '../lib/challenge_2-stack';
import * as ecs from '@aws-cdk/aws-ecs';
import * as ec2 from '@aws-cdk/aws-ec2';

const app = new cdk.App();

const env = { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION };

const stack = new cdk.Stack(app, 'Challenge2Stack', { env })

const nyancatTask = new ecs.FargateTaskDefinition(stack, 'NyanCatTask', {
  cpu: 256,
  memoryLimitMiB: 512,
})

nyancatTask.addContainer('nyancat', {
  image: ecs.ContainerImage.fromRegistry('public.ecr.aws/pahudnet/nyancat-docker-image:latest'),
  portMappings: [ { containerPort: 80 }]
})

// const vpc = ec2.Vpc.fromLookup(stack, 'Vpc', { vpcId: 'vpc-0a34863cb7953f801' })
new StandardService(stack, 'DemoService', {
  tasks: [
    {
      task: nyancatTask,
      external: { port: 80 }
    }
  ],
//  vpc: vpc,
});

// new Challenge2Stack(app, 'Challenge2Stack', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
// });
