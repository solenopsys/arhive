package keeper_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	testkeeper "solechain/testutil/keeper"
	"solechain/x/solechain/types"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.SolechainKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
