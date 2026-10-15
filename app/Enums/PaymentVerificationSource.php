<?php

namespace App\Enums;

enum PaymentVerificationSource: string
{
    case Webhook = 'webhook';
    case StatusApi = 'status_api';
}
