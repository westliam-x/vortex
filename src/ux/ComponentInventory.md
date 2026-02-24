# Component Inventory Spec

## Layout
- `AppShell` - global frame with sidebar, top navbar, content outlet.
- `PageHeader` - title, subtitle, primary and secondary actions.
- `ContentGrid` - responsive main/right-panel grid wrapper.
- `RightContextPanel` - status/metadata/actions panel with sticky desktop behavior.
- `SectionCard` - standardized page section container.
- `ToolbarRow` - search, filters, sort, bulk actions row.

## Navigation
- `SidebarNav` - grouped primary navigation.
- `MobileNavDrawer` - mobile navigation entry and route list.
- `Breadcrumbs` - hierarchy for detail pages.
- `TabNav` - section switching inside detail pages.
- `PaginationControls` - paging for long data lists.

## Data Display
- `StatCard` - KPI metric with label and delta.
- `DataTable` - sortable table with column config.
- `DataList` - card/list renderer for responsive views.
- `EntityCard` - shared card for project/client/invoice summaries.
- `ActivityTimeline` - log stream with actor/action/target/status/time.
- `StatusBadge` - normalized status tokens (pending/approved/paid/etc).
- `KeyValueList` - compact metadata display in side panel.
- `ReviewItem` - rating/comment/status block.
- `PaymentEventRow` - payment source, amount, status, timestamp.
- `FileRow` - file name/type/size/uploader/date with actions.
- `MessageThread` - chronological message list for share spaces.

## Forms
- `FormSection` - titled group wrapper with helper text.
- `TextField` - standardized text/email/number input.
- `TextAreaField` - multiline form input.
- `SelectField` - single-select with validation/error states.
- `DateField` - date picker wrapper.
- `CurrencyField` - amount + currency combination field.
- `TagMultiSelect` - team/tech stack multi-select.
- `FormActions` - submit/cancel/destructive action row.
- `OtpField` - segmented OTP input.
- `FileUploadField` - drag/drop + picker with file constraints.

## Feedback
- `InlineFieldError` - validation message under control.
- `BannerNotice` - page/section-level success/warn/error messages.
- `ToastFeedback` - transient async result messages.
- `EmptyStateBlock` - icon, message, primary action, optional secondary action.
- `NoResultsBlock` - filter/search no-match state with reset action.
- `SkeletonBlock` - layout-preserving loading placeholder.
- `ErrorStateBlock` - recoverable error with retry.
- `PermissionState` - explicit auth/forbidden state messaging.

## Modals and Drawers
- `ConfirmDialog` - destructive or irreversible action confirmation.
- `EntityFormModal` - reusable modal shell for create/edit forms.
- `InviteModal` - invite user/client flow with role/type selector.
- `ProjectModal` - add/edit project payload flow.
- `ClientModal` - add/edit client flow.
- `InvoicePreviewModal` - invoice review before send/export.
- `ShareLinkModal` - enable/disable share link + expiry controls.
- `FilterDrawer` - mobile filter and sort controls.
- `ActivityDetailsDrawer` - expanded log or event details.
