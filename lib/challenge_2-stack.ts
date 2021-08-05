import * as cdk from '@aws-cdk/core';
import * as ecs from '@aws-cdk/aws-ecs';
import { DualAlbFargateService, FargateTaskProps } from 'cdk-fargate-patterns';
import * as ec2 from '@aws-cdk/aws-ec2';


export interface StandardServiceProps {
  readonly vpc?: ec2.IVpc;
  readonly tasks: FargateTaskProps[];
}

export class StandardService extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props: StandardServiceProps) {
    super(scope, id)

    new DualAlbFargateService(this, 'Service', {
      tasks: props.tasks,
      vpc: props.vpc,
    })
  }
}
