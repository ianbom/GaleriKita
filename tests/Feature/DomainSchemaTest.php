<?php

namespace Tests\Feature;

use App\Enums\OrderStatus;
use App\Enums\UserRole;
use App\Enums\WebhookStatus;
use App\Models\ActivityLog;
use App\Models\Event;
use App\Models\EventGuest;
use App\Models\EventPlanChange;
use App\Models\GoogleDriveConnection;
use App\Models\GuestSession;
use App\Models\Order;
use App\Models\Payment;
use App\Models\PaymentWebhook;
use App\Models\Photo;
use App\Models\PhotoLike;
use App\Models\Plan;
use App\Models\PlanVersion;
use App\Models\SocialAccount;
use App\Models\User;
use App\Models\Voucher;
use App\Models\VoucherPlan;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use Tests\TestCase;

class DomainSchemaTest extends TestCase
{
    use RefreshDatabase;

    public function test_every_database_table_has_its_own_migration(): void
    {
        $expectedTables = [
            'users', 'password_reset_tokens', 'sessions', 'cache', 'cache_locks', 'jobs', 'job_batches', 'failed_jobs', 'passkeys',
            'social_accounts', 'event_categories', 'media_assets', 'plans', 'plan_versions', 'events', 'event_settings',
            'event_entitlements', 'orders', 'payments', 'payment_webhooks', 'event_plan_changes', 'event_guests',
            'guest_sessions', 'photo_presets', 'upload_intents', 'photos', 'photo_variants', 'photo_likes',
            'google_drive_connections', 'event_drive_exports', 'photo_drive_syncs', 'activity_logs', 'vouchers',
            'voucher_plans', 'voucher_redemptions',
        ];

        foreach ($expectedTables as $table) {
            $this->assertTrue(Schema::hasTable($table), "Missing table [{$table}].");
        }

        $createStatements = [];
        foreach (glob(database_path('migrations/*.php')) as $migration) {
            preg_match_all("/Schema::create\('([^']+)'/", file_get_contents($migration), $matches);
            $this->assertLessThanOrEqual(1, count($matches[1]), "Migration [{$migration}] creates multiple tables.");
            foreach ($matches[1] as $table) {
                $createStatements[$table][] = basename($migration);
            }
        }

        foreach ($expectedTables as $table) {
            $this->assertCount(1, $createStatements[$table] ?? [], "Table [{$table}] must have exactly one create migration.");
        }
    }

    public function test_user_has_domain_relationships_without_exposing_role_to_mass_assignment(): void
    {
        $user = new User;

        $this->assertFalse($user->isFillable('role'));
        foreach (['events', 'orders', 'socialAccounts', 'googleDriveConnections', 'createdVouchers', 'voucherRedemptions', 'deletedPhotos', 'activityLogs'] as $method) {
            $this->assertTrue(method_exists($user, $method), "Missing User::{$method}() relationship.");
        }
    }

    public function test_every_documented_foreign_key_has_matching_eloquent_relationships(): void
    {
        $references = [
            ['social_accounts', 'user_id', 'users', 'user', 'socialAccounts', false],
            ['events', 'user_id', 'users', 'user', 'events', false],
            ['events', 'event_category_id', 'event_categories', 'category', 'events', false],
            ['events', 'cover_media_asset_id', 'media_assets', 'coverMediaAsset', 'coverEvents', false],
            ['event_settings', 'event_id', 'events', 'event', 'settings', true],
            ['plan_versions', 'plan_id', 'plans', 'plan', 'versions', false],
            ['event_entitlements', 'event_id', 'events', 'event', 'entitlement', true],
            ['event_entitlements', 'current_plan_version_id', 'plan_versions', 'currentPlanVersion', 'eventEntitlements', false],
            ['orders', 'user_id', 'users', 'user', 'orders', false],
            ['orders', 'event_id', 'events', 'event', 'orders', false],
            ['orders', 'target_plan_version_id', 'plan_versions', 'targetPlanVersion', 'targetOrders', false],
            ['orders', 'voucher_id', 'vouchers', 'voucher', 'orders', false],
            ['payments', 'order_id', 'orders', 'order', 'payments', false],
            ['payment_webhooks', 'payment_id', 'payments', 'payment', 'webhooks', false],
            ['event_plan_changes', 'event_id', 'events', 'event', 'planChanges', false],
            ['event_plan_changes', 'order_id', 'orders', 'order', 'planChange', true],
            ['event_plan_changes', 'previous_plan_version_id', 'plan_versions', 'previousPlanVersion', 'previousPlanChanges', false],
            ['event_plan_changes', 'new_plan_version_id', 'plan_versions', 'newPlanVersion', 'newPlanChanges', false],
            ['event_guests', 'event_id', 'events', 'event', 'guests', false],
            ['guest_sessions', 'event_guest_id', 'event_guests', 'eventGuest', 'session', true],
            ['photo_presets', 'preview_media_asset_id', 'media_assets', 'previewMediaAsset', 'previewPresets', false],
            ['upload_intents', 'event_id', 'events', 'event', 'uploadIntents', false],
            ['upload_intents', 'event_guest_id', 'event_guests', 'eventGuest', 'uploadIntents', false],
            ['photos', 'event_id', 'events', 'event', 'photos', false],
            ['photos', 'event_guest_id', 'event_guests', 'eventGuest', 'photos', false],
            ['photos', 'upload_intent_id', 'upload_intents', 'uploadIntent', 'photo', true],
            ['photos', 'final_media_asset_id', 'media_assets', 'finalMediaAsset', 'finalPhoto', true],
            ['photos', 'color_preset_id', 'photo_presets', 'colorPreset', 'colorPhotos', false],
            ['photos', 'border_preset_id', 'photo_presets', 'borderPreset', 'borderPhotos', false],
            ['photos', 'deleted_by_user_id', 'users', 'deletedByUser', 'deletedPhotos', false],
            ['photos', 'deleted_by_guest_id', 'event_guests', 'deletedByGuest', 'deletedPhotos', false],
            ['photo_variants', 'photo_id', 'photos', 'photo', 'variants', false],
            ['photo_variants', 'media_asset_id', 'media_assets', 'mediaAsset', 'photoVariant', true],
            ['photo_likes', 'photo_id', 'photos', 'photo', 'likes', false],
            ['photo_likes', 'event_guest_id', 'event_guests', 'eventGuest', 'likes', false],
            ['google_drive_connections', 'user_id', 'users', 'user', 'googleDriveConnections', false],
            ['event_drive_exports', 'event_id', 'events', 'event', 'driveExport', true],
            ['event_drive_exports', 'google_drive_connection_id', 'google_drive_connections', 'connection', 'eventExports', false],
            ['photo_drive_syncs', 'event_drive_export_id', 'event_drive_exports', 'eventDriveExport', 'photoSyncs', false],
            ['photo_drive_syncs', 'photo_id', 'photos', 'photo', 'driveSyncs', false],
            ['activity_logs', 'event_id', 'events', 'event', 'activityLogs', false],
            ['activity_logs', 'actor_user_id', 'users', 'actorUser', 'activityLogs', false],
            ['activity_logs', 'actor_guest_id', 'event_guests', 'actorGuest', 'activityLogs', false],
            ['vouchers', 'created_by_user_id', 'users', 'creator', 'createdVouchers', false],
            ['voucher_plans', 'voucher_id', 'vouchers', 'voucher', 'voucherPlans', false],
            ['voucher_plans', 'plan_id', 'plans', 'plan', 'voucherPlans', false],
            ['voucher_redemptions', 'voucher_id', 'vouchers', 'voucher', 'redemptions', false],
            ['voucher_redemptions', 'user_id', 'users', 'user', 'voucherRedemptions', false],
            ['voucher_redemptions', 'order_id', 'orders', 'order', 'voucherRedemption', true],
        ];

        foreach ($references as [$table, $foreignKey, $parentTable, $childRelation, $parentRelation, $isOneToOne]) {
            $childClass = 'App\\Models\\'.Str::studly(Str::singular($table));
            $parentClass = 'App\\Models\\'.Str::studly(Str::singular($parentTable));
            $child = (new $childClass)->{$childRelation}();
            $parent = (new $parentClass)->{$parentRelation}();

            $this->assertInstanceOf(BelongsTo::class, $child);
            $this->assertSame($parentClass, $child->getRelated()::class);
            $this->assertSame($foreignKey, $child->getForeignKeyName());
            $this->assertInstanceOf(
                $isOneToOne
                    ? HasOne::class
                    : HasMany::class,
                $parent,
            );
            $this->assertSame($childClass, $parent->getRelated()::class);
            $this->assertSame($foreignKey, $parent->getForeignKeyName());

            $this->assertContains([
                'columns' => [$foreignKey],
                'foreign_table' => $parentTable,
                'foreign_columns' => ['id'],
            ], array_map(
                static fn (array $foreign): array => [
                    'columns' => $foreign['columns'],
                    'foreign_table' => $foreign['foreign_table'],
                    'foreign_columns' => $foreign['foreign_columns'],
                ],
                Schema::getForeignKeys($table),
            ));
        }
    }

    public function test_documented_columns_nullability_and_indexes(): void
    {
        $schema = [
            'users' => [
                ['id', 'name', 'email', 'role'],
                ['password', 'email_verified_at', 'remember_token', 'created_at', 'updated_at', 'deleted_at'],
                [[['role'], false], [['email'], true]],
            ],
            'social_accounts' => [
                ['id', 'user_id', 'provider', 'provider_user_id'],
                ['provider_email', 'linked_at', 'created_at', 'updated_at'],
                [[['provider', 'provider_user_id'], true], [['user_id', 'provider'], true]],
            ],
            'event_categories' => [
                ['id', 'name', 'slug', 'sort_order', 'is_active'],
                ['description', 'created_at', 'updated_at'],
                [[['slug'], true]],
            ],
            'media_assets' => [
                ['id', 'storage_disk', 'storage_key', 'mime_type', 'file_size_bytes', 'status'],
                ['provider_asset_id', 'provider_resource_type', 'provider_delivery_type', 'provider_version', 'width', 'height', 'checksum_sha256', 'uploaded_at', 'deleted_at', 'created_at', 'updated_at'],
                [[['storage_disk', 'storage_key'], true], [['storage_disk', 'provider_asset_id'], false], [['status', 'created_at'], false]],
            ],
            'plans' => [
                ['id', 'code', 'name', 'sort_order', 'is_active'],
                ['description', 'created_at', 'updated_at', 'deleted_at'],
                [[['is_active', 'sort_order'], false], [['code'], true]],
            ],
            'plan_versions' => [
                ['id', 'plan_id', 'version_number', 'photographer_limit', 'photos_per_photographer', 'price_idr', 'is_current'],
                ['published_at', 'created_at'],
                [[['plan_id', 'version_number'], true], [['plan_id', 'is_current'], false]],
            ],
            'events' => [
                ['id', 'user_id', 'public_slug', 'timezone', 'status'],
                ['event_category_id', 'name', 'cover_media_asset_id', 'start_at', 'end_at', 'activated_at', 'cancelled_at', 'archived_at', 'created_at', 'updated_at', 'deleted_at'],
                [[['user_id', 'created_at'], false], [['status', 'start_at'], false], [['status', 'end_at'], false], [['event_category_id'], false], [['public_slug'], true]],
            ],
            'event_settings' => [
                ['id', 'event_id', 'visibility', 'photo_reveal_mode'],
                ['created_at', 'updated_at'],
                [[['event_id'], true]],
            ],
            'event_entitlements' => [
                ['id', 'event_id', 'current_plan_version_id', 'photographer_limit', 'photos_per_photographer', 'current_plan_value_idr', 'photographers_used', 'version', 'activated_at'],
                ['created_at', 'updated_at'],
                [[['event_id'], true]],
            ],
            'orders' => [
                ['id', 'order_code', 'user_id', 'event_id', 'type', 'target_plan_version_id', 'photographer_limit_snapshot', 'photos_per_photographer_snapshot', 'previous_plan_value_idr', 'target_plan_value_idr', 'subtotal_idr', 'discount_idr', 'amount_due_idr', 'currency', 'status', 'fulfillment_status'],
                ['base_entitlement_version', 'voucher_id', 'voucher_code_snapshot', 'voucher_discount_type_snapshot', 'voucher_discount_value_snapshot', 'settlement_source', 'fulfillment_error', 'expires_at', 'paid_at', 'fulfilled_at', 'created_at', 'updated_at'],
                [[['event_id', 'type', 'status'], false], [['event_id', 'fulfillment_status'], false], [['user_id', 'created_at'], false], [['voucher_id', 'status'], false], [['order_code'], true]],
            ],
            'payments' => [
                ['id', 'order_id', 'provider', 'environment', 'provider_order_id', 'amount_idr', 'currency', 'status'],
                ['provider_transaction_id', 'snap_token_encrypted', 'snap_redirect_url', 'snap_created_at', 'snap_expires_at', 'gateway_expires_at', 'payment_method', 'gateway_status', 'gateway_fraud_status', 'gateway_status_code', 'gateway_gross_amount_idr', 'verified_via', 'last_checked_at', 'provider_response', 'last_error', 'paid_at', 'expired_at', 'created_at', 'updated_at'],
                [[['order_id', 'status'], false], [['status', 'last_checked_at'], false], [['environment', 'gateway_status'], false], [['provider_order_id'], true], [['provider_transaction_id'], true]],
            ],
            'payment_webhooks' => [
                ['id', 'provider', 'payload_sha256', 'signature_valid', 'status', 'payload', 'processing_attempts', 'received_at'],
                ['payment_id', 'provider_order_id', 'provider_transaction_id', 'gateway_status', 'error_message', 'processing_started_at', 'processed_at'],
                [[['provider', 'provider_order_id', 'received_at'], false], [['payment_id', 'received_at'], false], [['status', 'received_at'], false], [['payload_sha256', 'received_at'], false]],
            ],
            'event_plan_changes' => [
                ['id', 'event_id', 'order_id', 'new_plan_version_id', 'new_photographer_limit', 'new_photos_per_photographer', 'previous_plan_value_idr', 'new_plan_value_idr', 'paid_difference_idr', 'applied_at'],
                ['previous_plan_version_id', 'previous_photographer_limit', 'previous_photos_per_photographer'],
                [[['event_id', 'applied_at'], false], [['order_id'], true]],
            ],
            'event_guests' => [
                ['id', 'event_id', 'display_name', 'status', 'uploads_used', 'uploads_reserved', 'joined_at'],
                ['created_at', 'updated_at'],
                [[['event_id', 'joined_at'], false], [['event_id', 'status'], false]],
            ],
            'guest_sessions' => [
                ['id', 'event_guest_id', 'token_hash'],
                ['last_seen_at', 'expires_at', 'revoked_at', 'created_at', 'updated_at'],
                [[['event_guest_id'], true], [['token_hash'], true]],
            ],
            'photo_presets' => [
                ['id', 'kind', 'name', 'code', 'version_number', 'effect_settings', 'sort_order', 'is_active'],
                ['preview_media_asset_id', 'created_at', 'updated_at'],
                [[['kind', 'is_active', 'sort_order'], false], [['code'], true]],
            ],
            'upload_intents' => [
                ['id', 'event_id', 'event_guest_id', 'client_upload_id', 'storage_disk', 'reserved_storage_key', 'max_bytes', 'status', 'reserved_at', 'expires_at'],
                ['expected_mime_type', 'finalized_at', 'created_at', 'updated_at'],
                [[['event_guest_id', 'client_upload_id'], true], [['storage_disk', 'reserved_storage_key'], true], [['status', 'expires_at'], false], [['event_id', 'created_at'], false]],
            ],
            'photos' => [
                ['id', 'event_id', 'event_guest_id', 'upload_intent_id', 'final_media_asset_id', 'source', 'status', 'likes_count', 'uploaded_at'],
                ['color_preset_id', 'border_preset_id', 'filter_snapshot', 'captured_at', 'deleted_at', 'deleted_by_user_id', 'deleted_by_guest_id', 'created_at', 'updated_at'],
                [[['event_id', 'status', 'uploaded_at'], false], [['event_guest_id', 'status', 'uploaded_at'], false], [['event_id', 'deleted_at'], false], [['upload_intent_id'], true], [['final_media_asset_id'], true]],
            ],
            'photo_variants' => [
                ['id', 'photo_id', 'kind', 'media_asset_id'],
                ['created_at', 'updated_at'],
                [[['photo_id', 'kind'], true], [['media_asset_id'], true]],
            ],
            'photo_likes' => [
                ['id', 'photo_id', 'event_guest_id'],
                ['created_at'],
                [[['photo_id', 'event_guest_id'], true], [['event_guest_id'], false]],
            ],
            'google_drive_connections' => [
                ['id', 'user_id', 'google_subject', 'google_email', 'status'],
                ['refresh_token_encrypted', 'granted_scopes', 'connected_at', 'last_checked_at', 'created_at', 'updated_at'],
                [[['user_id', 'google_subject'], true], [['user_id', 'status'], false]],
            ],
            'event_drive_exports' => [
                ['id', 'event_id', 'google_drive_connection_id', 'status'],
                ['drive_folder_id', 'drive_folder_name', 'started_at', 'completed_at', 'last_error', 'created_at', 'updated_at'],
                [[['status', 'started_at'], false], [['event_id'], true]],
            ],
            'photo_drive_syncs' => [
                ['id', 'event_drive_export_id', 'photo_id', 'status', 'attempts'],
                ['drive_file_id', 'last_error', 'started_at', 'synced_at', 'created_at', 'updated_at'],
                [[['event_drive_export_id', 'photo_id'], true], [['status', 'updated_at'], false]],
            ],
            'activity_logs' => [
                ['id', 'actor_type', 'action', 'subject_type', 'subject_id', 'created_at'],
                ['event_id', 'actor_user_id', 'actor_guest_id', 'changes'],
                [[['event_id', 'created_at'], false], [['actor_type', 'created_at'], false], [['subject_type', 'subject_id'], false]],
            ],
            'vouchers' => [
                ['id', 'code', 'name', 'created_by_user_id', 'discount_type', 'discount_value', 'min_order_idr', 'applicability', 'usage_limit_per_user', 'is_active'],
                ['description', 'max_discount_idr', 'usage_limit', 'starts_at', 'expires_at', 'created_at', 'updated_at', 'deleted_at'],
                [[['is_active', 'starts_at', 'expires_at'], false], [['created_by_user_id'], false], [['code'], true]],
            ],
            'voucher_plans' => [
                ['id', 'voucher_id', 'plan_id'],
                ['created_at'],
                [[['voucher_id', 'plan_id'], true], [['plan_id'], false]],
            ],
            'voucher_redemptions' => [
                ['id', 'voucher_id', 'user_id', 'order_id', 'status', 'discount_idr', 'reserved_at'],
                ['reservation_expires_at', 'redeemed_at', 'released_at', 'created_at', 'updated_at'],
                [[['voucher_id', 'status'], false], [['voucher_id', 'user_id', 'status'], false], [['status', 'reservation_expires_at'], false], [['order_id'], true]],
            ],
        ];

        foreach ($schema as $table => [$required, $nullable, $indexes]) {
            $columns = array_column(Schema::getColumns($table), 'nullable', 'name');
            foreach ($required as $column) {
                $this->assertArrayHasKey($column, $columns, "Missing {$table}.{$column}.");
                $this->assertFalse($columns[$column], "{$table}.{$column} must not be nullable.");
            }
            foreach ($nullable as $column) {
                $this->assertArrayHasKey($column, $columns, "Missing {$table}.{$column}.");
                $this->assertTrue($columns[$column], "{$table}.{$column} must be nullable.");
            }
            $actual = Schema::getIndexes($table);
            foreach ($indexes as [$indexedColumns, $unique]) {
                $this->assertNotEmpty(array_filter($actual, static fn (array $index): bool => $index['columns'] === $indexedColumns && $index['unique'] === $unique), "Missing index on {$table}.");
            }
        }
    }

    public function test_sensitive_tokens_are_encrypted_and_hidden(): void
    {
        foreach ([
            [new Payment, 'snap_token_encrypted'],
            [new GoogleDriveConnection, 'refresh_token_encrypted'],
        ] as [$model, $column]) {
            $model->setAttribute($column, 'secret-token');
            $this->assertSame('secret-token', $model->getAttribute($column));
            $this->assertNotSame('secret-token', $model->getAttributes()[$column]);
            $this->assertArrayNotHasKey($column, $model->toArray());
        }
        $session = new GuestSession(['token_hash' => str_repeat('a', 64)]);
        $this->assertArrayNotHasKey('token_hash', $session->toArray());
    }

    public function test_only_created_at_or_no_timestamps_are_used_where_documented(): void
    {
        foreach ([new PlanVersion, new PhotoLike, new VoucherPlan, new ActivityLog] as $model) {
            $this->assertTrue($model->usesTimestamps());
            $this->assertSame('created_at', $model->getCreatedAtColumn());
            $this->assertNull($model->getUpdatedAtColumn());
        }
        foreach ([new PaymentWebhook, new EventPlanChange] as $model) {
            $this->assertFalse($model->usesTimestamps());
        }
    }

    public function test_google_only_users_can_have_no_password_with_safe_defaults(): void
    {
        $user = User::create(['name' => 'Google Host', 'email' => 'google@example.test', 'password' => null])->refresh();
        $this->assertNull($user->password);
        $this->assertSame(UserRole::User, $user->role);
        $this->assertArrayNotHasKey('password', $user->toArray());
        $this->assertSame(['email', 'token', 'created_at'], Schema::getColumnListing('password_reset_tokens'));
    }

    public function test_registration_rejects_names_and_emails_beyond_the_schema_limits(): void
    {
        $this->post(route('register.store'), [
            'name' => str_repeat('n', 151),
            'email' => str_repeat('a', 60).'@'.str_repeat('b', 55).'.'.str_repeat('c', 40).'.test',
            'password' => 'password',
            'password_confirmation' => 'password',
        ])->assertSessionHasErrors(['name', 'email']);
    }

    public function test_voucher_codes_are_normalized_before_persistence(): void
    {
        $voucher = new Voucher(['code' => '  welcome10  ']);
        $this->assertSame('WELCOME10', $voucher->code);
    }

    public function test_plan_versions_allow_history_but_only_one_current_version_per_plan(): void
    {
        $plan = Plan::create(['code' => 'basic', 'name' => 'Basic']);
        $attributes = ['plan_id' => $plan->id, 'photographer_limit' => 10, 'photos_per_photographer' => 20, 'price_idr' => 50000];
        PlanVersion::create([...$attributes, 'version_number' => 1, 'is_current' => false]);
        PlanVersion::create([...$attributes, 'version_number' => 2, 'is_current' => false]);
        $current = PlanVersion::create([...$attributes, 'version_number' => 3, 'is_current' => true]);

        $this->assertCount(3, $plan->versions);
        $this->assertNotNull($current->created_at);
        $this->assertDatabaseRejects(fn () => PlanVersion::create([...$attributes, 'version_number' => 4, 'is_current' => true]));
    }

    public function test_voucher_plan_pivots_and_case_insensitive_uniqueness(): void
    {
        $user = User::factory()->create();
        $plan = Plan::create(['code' => 'basic', 'name' => 'Basic']);
        $voucher = Voucher::create([
            'code' => 'welcome', 'name' => 'Welcome', 'created_by_user_id' => $user->id,
            'discount_type' => 'percentage', 'discount_value' => 10,
        ]);
        $voucher->plans()->attach($plan->id, ['created_at' => now()]);
        $pivot = VoucherPlan::firstOrFail();
        $pivot->save();

        $this->assertSame($plan->id, $voucher->plans()->sole()->id);
        $this->assertSame($voucher->id, $plan->vouchers()->sole()->id);
        $this->assertNotNull($pivot->created_at);
        $this->assertDatabaseRejects(fn () => DB::table('vouchers')->insert([
            'code' => 'wElCoMe', 'name' => 'Duplicate', 'created_by_user_id' => $user->id,
            'discount_type' => 'percentage', 'discount_value' => 10,
        ]));
        $this->assertDatabaseRejects(fn () => VoucherPlan::create(['voucher_id' => $voucher->id, 'plan_id' => $plan->id]));
    }

    public function test_database_rejects_invalid_roles_and_orphan_foreign_keys(): void
    {
        $user = User::factory()->create();
        $this->assertDatabaseRejects(fn () => DB::table('users')->where('id', $user->id)->update(['role' => 'superuser']));
        $this->assertDatabaseRejects(fn () => SocialAccount::create([
            'user_id' => -1, 'provider' => 'google', 'provider_user_id' => 'unknown-user',
        ]));
    }

    public function test_historical_relations_remain_readable_after_soft_deletion(): void
    {
        $user = User::factory()->create();
        $plan = Plan::create(['code' => 'basic', 'name' => 'Basic']);
        $version = PlanVersion::create([
            'plan_id' => $plan->id, 'version_number' => 1, 'photographer_limit' => 10,
            'photos_per_photographer' => 20, 'price_idr' => 50000,
        ]);
        $event = Event::create(['user_id' => $user->id, 'public_slug' => 'random-event']);
        $order = Order::create([
            'order_code' => 'GK-TEST-1', 'user_id' => $user->id, 'event_id' => $event->id,
            'type' => 'initial', 'target_plan_version_id' => $version->id,
            'photographer_limit_snapshot' => 10, 'photos_per_photographer_snapshot' => 20,
            'target_plan_value_idr' => 50000, 'subtotal_idr' => 9876543210000, 'amount_due_idr' => 9876543210000,
        ])->refresh();
        $change = EventPlanChange::create([
            'event_id' => $event->id, 'order_id' => $order->id, 'new_plan_version_id' => $version->id,
            'new_photographer_limit' => 10, 'new_photos_per_photographer' => 20,
            'new_plan_value_idr' => 50000, 'paid_difference_idr' => 50000, 'applied_at' => now(),
        ]);

        $this->assertSame(9876543210000, $order->amount_due_idr);
        $this->assertSame(OrderStatus::Pending, $order->status);
        $this->assertSame($change->id, $order->planChange->id);
        $this->assertDatabaseRejects(fn () => EventPlanChange::create($change->getAttributes()));

        $user->delete();
        $event->delete();
        $plan->delete();

        $this->assertNull(User::find($user->id));
        $this->assertSame($user->id, $order->user->id);
        $this->assertSame($event->id, $order->event->id);
        $this->assertSame($plan->id, $version->plan->id);
    }

    public function test_webhook_and_activity_models_save_without_an_updated_at_column(): void
    {
        $webhook = PaymentWebhook::create([
            'payload' => ['transaction_status' => 'pending'], 'payload_sha256' => str_repeat('a', 64), 'received_at' => now(),
        ])->refresh();
        $activity = ActivityLog::create([
            'actor_type' => 'system', 'action' => 'event.created', 'subject_type' => 'event', 'subject_id' => 1,
        ])->refresh();

        $this->assertSame(['transaction_status' => 'pending'], $webhook->payload);
        $this->assertSame(WebhookStatus::Received, $webhook->status);
        $this->assertFalse($webhook->signature_valid);
        $this->assertNotNull($webhook->received_at);
        $this->assertNotNull($activity->created_at);
    }

    public function test_postgresql_column_types_match_the_design(): void
    {
        if (DB::connection()->getDriverName() !== 'pgsql') {
            $this->markTestSkipped('PostgreSQL-specific type inspection.');
        }

        foreach ([
            ['users', 'name', 'character varying', 150],
            ['users', 'email', 'character varying', 150],
            ['events', 'created_at', 'timestamp with time zone', null],
            ['payments', 'provider_response', 'jsonb', null],
            ['payments', 'provider_order_id', 'character varying', 50],
            ['orders', 'amount_due_idr', 'bigint', null],
        ] as [$table, $column, $type, $length]) {
            $actual = DB::selectOne(
                'SELECT data_type, character_maximum_length FROM information_schema.columns WHERE table_schema = current_schema() AND table_name = ? AND column_name = ?',
                [$table, $column],
            );
            $this->assertNotNull($actual);
            $this->assertSame($type, $actual->data_type);
            $this->assertSame($length, $actual->character_maximum_length);
        }
    }

    public function test_photo_likes_define_the_guest_photo_many_to_many_relationship(): void
    {
        $likedPhotos = (new EventGuest)->likedPhotos();
        $likedByGuests = (new Photo)->likedByGuests();

        $this->assertSame('photo_likes', $likedPhotos->getTable());
        $this->assertSame('event_guest_id', $likedPhotos->getForeignPivotKeyName());
        $this->assertSame('photo_id', $likedPhotos->getRelatedPivotKeyName());
        $this->assertSame('photo_likes', $likedByGuests->getTable());
        $this->assertSame('photo_id', $likedByGuests->getForeignPivotKeyName());
        $this->assertSame('event_guest_id', $likedByGuests->getRelatedPivotKeyName());
    }

    private function assertDatabaseRejects(callable $write): void
    {
        try {
            DB::transaction($write);
        } catch (QueryException $exception) {
            $this->assertStringStartsWith('23', (string) $exception->getCode());

            return;
        }

        $this->fail('The database accepted a write that violates a schema constraint.');
    }
}
