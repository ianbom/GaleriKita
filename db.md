// GALERIKITA — Database v4.0 + Midtrans Snap + Voucher (PostgreSQL / DBML)

// Scope: web-only, Laravel + Inertia + React, fixed admin-managed plan catalog + voucher discounts.

// Storage: local for development, Cloudinary for production, replaceable via media_assets.

// Currency: integer rupiah (BIGINT), no floating-point prices.

// Dates: timestamptz stored in UTC; display in the selected event timezone.

// Scheduled / Active / Ended are computed from paid/activated event + start_at/end_at.

// Discounts apply to initial purchases or upgrade DIFFERENCES, not the full target plan twice.

// Payments: Midtrans Snap; 1 order can have multiple payment attempts; each attempt gets unique Midtrans order_id &lt;= 50 chars.

// Webhooks and GET Status API verify payments; frontend callbacks NEVER activate event/entitlement.

// No customer-facing refund and NO payment_refunds table. Gateway anomalies are retained in raw status for admin review.

// Snap page expiry and the payment channel's expiry are distinct; never release voucher solely due to Snap page expiry.

// Full-discount orders (amount_due_idr = 0) are settled internally; NO Snap transaction is created.

// Certain multi-table business invariants require service-level transactions / CHECK constraints.

Enum user_role {

  user

  admin

}

Enum auth_provider {

  google

}

Enum event_status {

  draft

  pending_payment

  published

  cancelled

  archived

}

Enum gallery_visibility {

  private

  public

}

Enum reveal_mode {

  instant

  after_event

}

Enum media_status {

  pending

  ready

  delete_pending

  deleted

  failed

}

Enum guest_status {

  active

  blocked

}

Enum photo_source {

  camera

  gallery

}

Enum upload_status {

  reserved

  completed

  expired

  cancelled

}

Enum photo_status {

  processing

  ready

  hidden

  deleted

}

Enum preset_kind {

  color

  border

}

Enum photo_variant_kind {

  thumbnail

  preview

}

Enum order_type {

  initial

  upgrade

}

Enum order_status {

  pending

  paid

  failed

  expired

  cancelled

}

Enum payment_status {

  initiating

  pending

  paid

  failed

  expired

  cancelled

  requires_review

}

Enum payment_environment {

  sandbox

  production

}

Enum payment_verification_source {

  webhook

  status_api

}

Enum order_settlement_source {

  midtrans

  voucher_full_discount

}

Enum order_fulfillment_status {

  pending

  applied

  requires_review

}

Enum webhook_status {

  received

  processed

  ignored

  failed

}

Enum drive_connection_status {

  active

  needs_reauth

  revoked

}

Enum drive_export_status {

  waiting

  queued

  syncing

  completed

  partial_failed

  failed

  disabled

}

Enum drive_photo_status {

  pending

  processing

  synced

  failed

  skipped

}

Enum activity_actor_type {

  user

  guest

  system

}

Enum voucher_discount_type {

  percentage

  fixed

}

Enum voucher_applicability {

  initial

  upgrade

  both

}

Enum voucher_redemption_status {

  reserved

  redeemed

  released

}

// 01 — Registered hosts and admins

Table users {

  id bigint [pk, increment]

  name varchar(150) [not null]

  email varchar(150) [not null, unique]

  password varchar(255) [note: 'Nullable for Google-only login; password hash for email login.']

  role user_role [not null, default: 'user']

  email_verified_at timestamptz

  remember_token varchar(100)

  created_at timestamptz

  updated_at timestamptz

  deleted_at timestamptz

  indexes {

    role

  }

}

// 02 — External login identity (not Google Drive permission)

Table social_accounts {

  id bigint [pk, increment]

  user_id bigint [not null]

  provider auth_provider [not null]

  provider_user_id varchar(191) [not null, note: 'Google sub claim, not email.']

  provider_email varchar(150)

  linked_at timestamptz

  created_at timestamptz

  updated_at timestamptz

  indexes {

    (provider, provider\_user\_id) \[unique\]

    (user\_id, provider) \[unique\]

  }

}

// 03 — Password reset only for email-password accounts

Table password_reset_tokens {

  email varchar(150) [pk]

  token varchar(255) [not null]

  created_at timestamptz

}

// 04 — Wedding, birthday, trip, graduation, etc.

Table event_categories {

  id bigint [pk, increment]

  name varchar(100) [not null]

  slug varchar(120) [not null, unique]

  description text

  sort_order integer [not null, default: 0]

  is_active boolean [not null, default: true]

  created_at timestamptz

  updated_at timestamptz

}

// 05 — One storage catalog for cover, final photo, variant, preset preview

Table media_assets {

  id bigint [pk, increment]

  storage_disk varchar(40) [not null, note: 'local | cloudinary; use the same name as configured storage adapter.']

  storage_key varchar(512) [not null, note: 'Local relative path or Cloudinary public_id. Never store public URL as primary identity.']

  provider_asset_id varchar(255) [note: 'Cloudinary immutable asset_id; null for local.']

  provider_resource_type varchar(30) [note: 'e.g. image, null for local.']

  provider_delivery_type varchar(30) [note: 'e.g. authenticated; protect private galleries.']

  provider_version bigint

  mime_type varchar(100) [not null]

  file_size_bytes bigint [not null]

  width integer

  height integer

  checksum_sha256 char(64)

  status media_status [not null, default: 'pending']

  uploaded_at timestamptz

  deleted_at timestamptz

  created_at timestamptz

  updated_at timestamptz

  indexes {

    (storage\_disk, storage\_key) \[unique\]

    (storage\_disk, provider\_asset\_id)

    (status, created\_at)

  }

}

// 06 — Admin-maintained stable product identity, not custom builder

Table plans {

  id bigint [pk, increment]

  code varchar(80) [not null, unique]

  name varchar(120) [not null]

  description text

  sort_order integer [not null, default: 0]

  is_active boolean [not null, default: true]

  created_at timestamptz

  updated_at timestamptz

  deleted_at timestamptz [note: 'Prefer deactivate, retain historical orders and versions.']

  indexes {

    (is\_active, sort\_order)

  }

}

// 07 — Immutable catalog offer revision: price and both quotas set by admin

Table plan_versions {

  id bigint [pk, increment]

  plan_id bigint [not null]

  version_number integer [not null]

  photographer_limit integer [not null]

  photos_per_photographer integer [not null]

  price_idr bigint [not null]

  is_current boolean [not null, default: false, note: 'At most one current version per plan; enforce with partial unique index.']

  published_at timestamptz [note: 'Null means version not yet offered.']

  created_at timestamptz

  indexes {

    (plan\_id, version\_number) \[unique\]

    (plan\_id, is\_current)

  }

}

// 08 — Event creation and fixed 24-hour window

Table events {

  id bigint [pk, increment]

  user_id bigint [not null, note: 'Owning host']

  event_category_id bigint

  name varchar(180)

  public_slug varchar(150) [not null, unique, note: 'Random, unguessable; treat URL as shareable secret.']

  cover_media_asset_id bigint

  timezone varchar(64) [not null, default: 'Asia/Jakarta']

  start_at timestamptz

  end_at timestamptz [note: 'Must equal start_at + exactly 24 hours.']

  status event_status [not null, default: 'draft']

  activated_at timestamptz [note: 'Set only after verified initial payment.']

  cancelled_at timestamptz

  archived_at timestamptz

  created_at timestamptz

  updated_at timestamptz

  deleted_at timestamptz

  indexes {

    (user\_id, created\_at)

    (status, start\_at)

    (status, end\_at)

    event\_category\_id

  }

}

// 09 — Gallery visibility and reveal are independent configuration dimensions

Table event_settings {

  id bigint [pk, increment]

  event_id bigint [not null, unique]

  visibility gallery_visibility [not null, default: 'private']

  photo_reveal_mode reveal_mode [not null, default: 'after_event']

  created_at timestamptz

  updated_at timestamptz

}

// 10 — Snapshot of the paid plan currently held by each event

Table event_entitlements {

  id bigint [pk, increment]

  event_id bigint [not null, unique]

  current_plan_version_id bigint [not null]

  photographer_limit integer [not null]

  photos_per_photographer integer [not null]

  current_plan_value_idr bigint [not null, note: 'Full price of current plan version; upgrade credit baseline.']

  photographers_used integer [not null, default: 0, note: 'Atomically increment when new guest identity is created.']

  version integer [not null, default: 1, note: 'Monotonic revision used for concurrent upgrades.']

  activated_at timestamptz [not null]

  created_at timestamptz

  updated_at timestamptz

}

// 11 — Checkout quote (initial or upgrade); independent payment &amp; fulfillment states

Table orders {

  id bigint [pk, increment]

  order_code varchar(100) [not null, unique, note: 'Internal GaleriKita order code; NOT necessarily the Midtrans order_id.']

  user_id bigint [not null]

  event_id bigint [not null]

  type order_type [not null]

  target_plan_version_id bigint [not null]

  base_entitlement_version integer [note: 'Required for upgrade, null for initial purchase; revalidate on activation.']

  photographer_limit_snapshot integer [not null]

  photos_per_photographer_snapshot integer [not null]

  previous_plan_value_idr bigint [not null, default: 0]

  target_plan_value_idr bigint [not null]

  subtotal_idr bigint [not null, note: 'Initial: target plan catalog value; upgrade: new catalog value minus active catalog value.']

  voucher_id bigint [note: 'Nullable; only one voucher per order.']

  voucher_code_snapshot varchar(80)

  voucher_discount_type_snapshot voucher_discount_type

  voucher_discount_value_snapshot bigint

  discount_idr bigint [not null, default: 0]

  amount_due_idr bigint [not null, note: 'subtotal minus discount; 0 means internal voucher settlement with NO Midtrans call.']

  currency char(3) [not null, default: 'IDR']

  status order_status [not null, default: 'pending', note: 'Financial status: paid only after verified Midtrans or internally validated 100% voucher.']

  settlement_source order_settlement_source [note: 'Set at successful settlement; midtrans or voucher_full_discount.']

  fulfillment_status order_fulfillment_status [not null, default: 'pending', note: 'Separate from payment; applied means entitlement was committed.']

  fulfillment_error text [note: 'Manual follow-up when paid but entitlement cannot be applied (e.g., stale upgrade version).']

  expires_at timestamptz [note: 'Order lifecycle, not necessarily Snap page expiration; do not expire while channel may still settle.']

  paid_at timestamptz

  fulfilled_at timestamptz

  created_at timestamptz

  updated_at timestamptz

  indexes {

    (event\_id, type, status)

    (event\_id, fulfillment\_status)

    (user\_id, created\_at)

    (voucher\_id, status)

  }

}

// 12 — One Midtrans Snap session/payment attempt; multiple attempts can belong to one internal order

Table payments {

  id bigint [pk, increment]

  order_id bigint [not null]

  provider varchar(40) [not null, default: 'midtrans']

  environment payment_environment [not null, note: 'Must match the active Midtrans API environment.']

  provider_order_id varchar(50) [not null, unique, note: 'Unique Midtrans order_id per Snap session, max 50 characters; e.g. GK-20261015-1001-P1.']

  provider_transaction_id varchar(150) [unique, note: 'Nullable until Midtrans creates actual transaction (payment method chosen).']

  snap_token_encrypted text [note: 'Encrypted Snap token; decrypt only when opening checkout, never store server key here.']

  snap_redirect_url text

  snap_created_at timestamptz

  snap_expires_at timestamptz [note: 'Snap page/token expiry, not proof that a payment method has expired.']

  gateway_expires_at timestamptz [note: 'If known, actual payment method/transaction expiry; may differ from snap_expires_at.']

  payment_method varchar(80) [note: 'Latest payment_type, e.g. qris, bank_transfer, credit_card.']

  amount_idr bigint [not null, note: 'Must equal orders.amount_due_idr and verified Midtrans gross_amount.']

  currency char(3) [not null, default: 'IDR']

  status payment_status [not null, default: 'initiating']

  gateway_status varchar(40) [note: 'Raw Midtrans transaction_status: pending, capture, settlement, deny, expire, etc.']

  gateway_fraud_status varchar(30)

  gateway_status_code varchar(10)

  gateway_gross_amount_idr bigint [note: 'Parsed/verified amount from webhook or GET Status API.']

  verified_via payment_verification_source [note: 'Set only for trusted webhook or server-to-server GET Status API.']

  last_checked_at timestamptz

  provider_response jsonb [note: 'Latest SANITIZED gateway response, no sensitive tokens/card data/signatures.']

  last_error text

  paid_at timestamptz

  expired_at timestamptz

  created_at timestamptz

  updated_at timestamptz

  indexes {

    (order\_id, status)

    (status, last\_checked\_at)

    (environment, gateway\_status)

  }

}

// 13 — Audit of every notification, including repeats; idempotence enforced by order/payment state and unique event_plan_changes.order_id

Table payment_webhooks {

  id bigint [pk, increment]

  payment_id bigint [note: 'Nullable when gateway payment has not yet been matched; reconcile later.']

  provider varchar(40) [not null, default: 'midtrans']

  provider_order_id varchar(50) [note: 'Midtrans payload order_id, used to look up payments.provider_order_id.']

  provider_transaction_id varchar(150)

  gateway_status varchar(40) [note: 'Raw transaction_status received.']

  payload_sha256 char(64) [not null, note: 'Not globally UNIQUE; keep retries in the audit log. Not a substitute for business idempotency.']

  signature_valid boolean [not null, default: false]

  status webhook_status [not null, default: 'received']

  payload jsonb [not null, note: 'SANITIZED notification; redact sensitive personal/payment fields as required.']

  processing_attempts integer [not null, default: 0]

  error_message text

  received_at timestamptz [not null]

  processing_started_at timestamptz

  processed_at timestamptz

  indexes {

    (provider, provider\_order\_id, received\_at)

    (payment\_id, received\_at)

    (status, received\_at)

    (payload\_sha256, received\_at)

  }

}

// 14 — Trace of applied initial activation and subsequent paid upgrades

Table event_plan_changes {

  id bigint [pk, increment]

  event_id bigint [not null]

  order_id bigint [not null, unique, note: 'Idempotency: apply every paid order at most once.']

  previous_plan_version_id bigint

  new_plan_version_id bigint [not null]

  previous_photographer_limit integer

  previous_photos_per_photographer integer

  new_photographer_limit integer [not null]

  new_photos_per_photographer integer [not null]

  previous_plan_value_idr bigint [not null, default: 0]

  new_plan_value_idr bigint [not null]

  paid_difference_idr bigint [not null, note: 'Actual amount paid after voucher, 0 when fully discounted. Plan credit remains CATALOG value.']

  applied_at timestamptz [not null]

  indexes {

    (event\_id, applied\_at)

  }

}

// 15 — A photographer identity belongs to one specific event

Table event_guests {

  id bigint [pk, increment]

  event_id bigint [not null]

  display_name varchar(150) [not null]

  status guest_status [not null, default: 'active']

  uploads_used integer [not null, default: 0, note: 'Total successful uploads; deletion does not refund by provisional policy.']

  uploads_reserved integer [not null, default: 0]

  joined_at timestamptz [not null]

  created_at timestamptz

  updated_at timestamptz

  indexes {

    (event\_id, joined\_at)

    (event\_id, status)

  }

}

// 16 — Persistent browser identity used to restore a guest on repeated QR scan

Table guest_sessions {

  id bigint [pk, increment]

  event_guest_id bigint [not null, unique]

  token_hash char(64) [not null, unique, note: 'Hash of random opaque token. Not user display name.']

  last_seen_at timestamptz

  expires_at timestamptz

  revoked_at timestamptz

  created_at timestamptz

  updated_at timestamptz

}

// 17 — Admin-curated, selectable camera color or border presets

Table photo_presets {

  id bigint [pk, increment]

  kind preset_kind [not null]

  name varchar(100) [not null]

  code varchar(100) [not null, unique]

  version_number integer [not null, default: 1]

  effect_settings jsonb [not null, note: 'Declarative filter settings, not executable code.']

  preview_media_asset_id bigint

  sort_order integer [not null, default: 0]

  is_active boolean [not null, default: true]

  created_at timestamptz

  updated_at timestamptz

  indexes {

    (kind, is\_active, sort\_order)

  }

}

// 18 — Secure reservation before direct upload to Cloudinary or local endpoint

Table upload_intents {

  id bigint [pk, increment]

  event_id bigint [not null]

  event_guest_id bigint [not null]

  client_upload_id varchar(100) [not null, note: 'Client-provided stable idempotency key.']

  storage_disk varchar(40) [not null]

  reserved_storage_key varchar(512) [not null]

  expected_mime_type varchar(100)

  max_bytes bigint [not null]

  status upload_status [not null, default: 'reserved']

  reserved_at timestamptz [not null]

  expires_at timestamptz [not null]

  finalized_at timestamptz

  created_at timestamptz

  updated_at timestamptz

  indexes {

    (event\_guest\_id, client\_upload\_id) \[unique\]

    (storage\_disk, reserved\_storage\_key) \[unique\]

    (status, expires\_at)

    (event\_id, created\_at)

  }

}

// 19 — Final filtered camera output OR gallery-uploaded file; no raw camera original

Table photos {

  id bigint [pk, increment]

  event_id bigint [not null]

  event_guest_id bigint [not null]

  upload_intent_id bigint [not null, unique]

  final_media_asset_id bigint [not null, unique]

  source photo_source [not null]

  color_preset_id bigint

  border_preset_id bigint

  filter_snapshot jsonb [note: 'Applied filter/border revision; nullable for gallery uploads.']

  status photo_status [not null, default: 'processing']

  likes_count integer [not null, default: 0]

  captured_at timestamptz

  uploaded_at timestamptz [not null]

  deleted_at timestamptz

  deleted_by_user_id bigint

  deleted_by_guest_id bigint

  created_at timestamptz

  updated_at timestamptz

  indexes {

    (event\_id, status, uploaded\_at)

    (event\_guest\_id, status, uploaded\_at)

    (event\_id, deleted\_at)

  }

}

// 20 — Optional materialized thumbnails/previews (Cloudinary dynamic transformations need none)

Table photo_variants {

  id bigint [pk, increment]

  photo_id bigint [not null]

  kind photo_variant_kind [not null]

  media_asset_id bigint [not null, unique]

  created_at timestamptz

  updated_at timestamptz

  indexes {

    (photo\_id, kind) \[unique\]

  }

}

// 21 — One like per photographer per photo

Table photo_likes {

  id bigint [pk, increment]

  photo_id bigint [not null]

  event_guest_id bigint [not null]

  created_at timestamptz

  indexes {

    (photo\_id, event\_guest\_id) \[unique\]

    event\_guest\_id

  }

}

// 22 — Drive OAuth grant, separate from Google login

Table google_drive_connections {

  id bigint [pk, increment]

  user_id bigint [not null]

  google_subject varchar(191) [not null]

  google_email varchar(150) [not null]

  refresh_token_encrypted text [note: 'Store encrypted, never log.']

  granted_scopes text

  status drive_connection_status [not null, default: 'active']

  connected_at timestamptz

  last_checked_at timestamptz

  created_at timestamptz

  updated_at timestamptz

  indexes {

    (user\_id, google\_subject) \[unique\]

    (user\_id, status)

  }

}

// 23 — After-event export job for each event (optional when host linked Drive)

Table event_drive_exports {

  id bigint [pk, increment]

  event_id bigint [not null, unique]

  google_drive_connection_id bigint [not null]

  drive_folder_id varchar(255)

  drive_folder_name varchar(200)

  status drive_export_status [not null, default: 'waiting']

  started_at timestamptz

  completed_at timestamptz

  last_error text

  created_at timestamptz

  updated_at timestamptz

  indexes {

    (status, started\_at)

  }

}

// 24 — Persistent remote Drive file identity and per-photo retry status

Table photo_drive_syncs {

  id bigint [pk, increment]

  event_drive_export_id bigint [not null]

  photo_id bigint [not null]

  drive_file_id varchar(255)

  status drive_photo_status [not null, default: 'pending']

  attempts integer [not null, default: 0]

  last_error text

  started_at timestamptz

  synced_at timestamptz

  created_at timestamptz

  updated_at timestamptz

  indexes {

    (event\_drive\_export\_id, photo\_id) \[unique\]

    (status, updated\_at)

  }

}

// 25 — Host/guest/system audit events

Table activity_logs {

  id bigint [pk, increment]

  event_id bigint

  actor_type activity_actor_type [not null]

  actor_user_id bigint

  actor_guest_id bigint

  action varchar(100) [not null]

  subject_type varchar(100) [not null]

  subject_id bigint [not null]

  changes jsonb

  created_at timestamptz [not null]

  indexes {

    (event\_id, created\_at)

    (actor\_type, created\_at)

    (subject\_type, subject\_id)

  }

}

// 26 — Admin-managed voucher, fixed IDR or percent discount

Table vouchers {

  id bigint [pk, increment]

  code varchar(80) [not null, unique, note: 'Store uppercase and trim; enforce case-insensitive uniqueness at PostgreSQL level.']

  name varchar(150) [not null]

  description text

  created_by_user_id bigint [not null, note: 'Admin who created voucher (validate admin role in service).']

  discount_type voucher_discount_type [not null]

  discount_value bigint [not null, note: 'percentage: integer 1..100; fixed: IDR amount &gt; 0.']

  max_discount_idr bigint [note: 'Optional cap for percentage vouchers; null = no specific cap.']

  min_order_idr bigint [not null, default: 0, note: 'Check against subtotal BEFORE voucher discount.']

  applicability voucher_applicability [not null, default: 'initial']

  usage_limit integer [note: 'Null means no global usage limit.']

  usage_limit_per_user integer [not null, default: 1]

  starts_at timestamptz

  expires_at timestamptz

  is_active boolean [not null, default: true]

  created_at timestamptz

  updated_at timestamptz

  deleted_at timestamptz [note: 'Soft-delete only: orders and redemption history must remain readable.']

  indexes {

    (is\_active, starts\_at, expires\_at)

    created\_by\_user\_id

  }

}

// 27 — Optional plan targeting: no rows for a voucher = all active plans

Table voucher_plans {

  id bigint [pk, increment]

  voucher_id bigint [not null]

  plan_id bigint [not null, note: 'Restriction follows plan identity, regardless of the version selected.']

  created_at timestamptz

  indexes {

    (voucher\_id, plan\_id) \[unique\]

    plan\_id

  }

}

// 28 — One reservation/redemption per order; atomic usage limits

Table voucher_redemptions {

  id bigint [pk, increment]

  voucher_id bigint [not null]

  user_id bigint [not null]

  order_id bigint [not null, unique]

  status voucher_redemption_status [not null, default: 'reserved']

  discount_idr bigint [not null, note: 'Immutable discount amount captured on checkout.']

  reserved_at timestamptz [not null]

  reservation_expires_at timestamptz [note: 'Do not release while any payment attempt can still be paid; Snap page expiry alone is insufficient.']

  redeemed_at timestamptz

  released_at timestamptz

  created_at timestamptz

  updated_at timestamptz

  indexes {

    (voucher\_id, status)

    (voucher\_id, user\_id, status)

    (status, reservation\_expires\_at)

  }

}

// Relationships

Ref: social_accounts.user_id &gt; [users.id](http://users.id)

Ref: events.user_id &gt; [users.id](http://users.id)

Ref: events.event_category_id &gt; event\_[categories.id](http://categories.id)

Ref: events.cover_media_asset_id &gt; media\_[assets.id](http://assets.id)

Ref: event_settings.event_id - [events.id](http://events.id)

Ref: plan_versions.plan_id &gt; [plans.id](http://plans.id)

Ref: event_entitlements.event_id - [events.id](http://events.id)

Ref: event_entitlements.current_plan_version_id &gt; plan\_[versions.id](http://versions.id)

Ref: orders.user_id &gt; [users.id](http://users.id)

Ref: orders.event_id &gt; [events.id](http://events.id)

Ref: [orders.target](http://orders.target)\_plan_version_id &gt; plan\_[versions.id](http://versions.id)

Ref: orders.voucher_id &gt; [vouchers.id](http://vouchers.id)

Ref: payments.order_id &gt; [orders.id](http://orders.id)

Ref: payment_webhooks.payment_id &gt; [payments.id](http://payments.id)

Ref: event_plan_changes.event_id &gt; [events.id](http://events.id)

Ref: event_plan_changes.order_id - [orders.id](http://orders.id)

Ref: event_plan_changes.previous_plan_version_id &gt; plan\_[versions.id](http://versions.id)

Ref: event_plan\_[changes.new](http://changes.new)\_plan_version_id &gt; plan\_[versions.id](http://versions.id)

Ref: event_guests.event_id &gt; [events.id](http://events.id)

Ref: guest_sessions.event_guest_id - event\_[guests.id](http://guests.id)

Ref: photo_presets.preview_media_asset_id &gt; media\_[assets.id](http://assets.id)

Ref: upload_intents.event_id &gt; [events.id](http://events.id)

Ref: upload_intents.event_guest_id &gt; event\_[guests.id](http://guests.id)

Ref: photos.event_id &gt; [events.id](http://events.id)

Ref: photos.event_guest_id &gt; event\_[guests.id](http://guests.id)

Ref: photos.upload_intent_id - upload\_[intents.id](http://intents.id)

Ref: [photos.final](http://photos.final)\_media_asset_id - media\_[assets.id](http://assets.id)

Ref: photos.color_preset_id &gt; photo\_[presets.id](http://presets.id)

Ref: photos.border_preset_id &gt; photo\_[presets.id](http://presets.id)

Ref: photos.deleted_by_user_id &gt; [users.id](http://users.id)

Ref: photos.deleted_by_guest_id &gt; event\_[guests.id](http://guests.id)

Ref: photo\_[variants.photo](http://variants.photo)\_id &gt; [photos.id](http://photos.id)

Ref: photo\_[variants.media](http://variants.media)\_asset_id - media\_[assets.id](http://assets.id)

Ref: photo\_[likes.photo](http://likes.photo)\_id &gt; [photos.id](http://photos.id)

Ref: photo_likes.event_guest_id &gt; event\_[guests.id](http://guests.id)

Ref: google_drive_connections.user_id &gt; [users.id](http://users.id)

Ref: event_drive_exports.event_id - [events.id](http://events.id)

Ref: event_drive\_[exports.google](http://exports.google)\_drive_connection_id &gt; google_drive\_[connections.id](http://connections.id)

Ref: photo_drive_syncs.event_drive_export_id &gt; event_drive\_[exports.id](http://exports.id)

Ref: photo_drive\_[syncs.photo](http://syncs.photo)\_id &gt; [photos.id](http://photos.id)

Ref: activity_logs.event_id &gt; [events.id](http://events.id)

Ref: activity\_[logs.actor](http://logs.actor)\_user_id &gt; [users.id](http://users.id)

Ref: activity\_[logs.actor](http://logs.actor)\_guest_id &gt; event\_[guests.id](http://guests.id)

// Voucher relationships

Ref: vouchers.created_by_user_id &gt; [users.id](http://users.id)

Ref: voucher_plans.voucher_id &gt; [vouchers.id](http://vouchers.id)

Ref: voucher_plans.plan_id &gt; [plans.id](http://plans.id)

Ref: voucher_redemptions.voucher_id &gt; [vouchers.id](http://vouchers.id)

Ref: voucher_redemptions.user_id &gt; [users.id](http://users.id)

Ref: voucher_redemptions.order_id - [orders.id](http://orders.id)

