-- Append-only enforcement (per D-13, Pitfall 6 in RESEARCH.md)
-- Using RAISE EXCEPTION triggers instead of silent DO INSTEAD NOTHING rules
-- This ensures the application receives an error when attempting UPDATE/DELETE
-- on append-only tables, rather than silently dropping the operation.

CREATE OR REPLACE FUNCTION prevent_update_delete()
RETURNS TRIGGER AS $$
BEGIN
  RAISE EXCEPTION 'UPDATE and DELETE operations are not allowed on append-only table %', TG_TABLE_NAME;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Apply to all three append-only tables

CREATE TRIGGER no_update_ledger_entries
  BEFORE UPDATE OR DELETE ON "LedgerEntry"
  FOR EACH ROW EXECUTE FUNCTION prevent_update_delete();

CREATE TRIGGER no_update_audit_logs
  BEFORE UPDATE OR DELETE ON "AuditLog"
  FOR EACH ROW EXECUTE FUNCTION prevent_update_delete();

CREATE TRIGGER no_update_agent_action_logs
  BEFORE UPDATE OR DELETE ON "AgentActionLog"
  FOR EACH ROW EXECUTE FUNCTION prevent_update_delete();
