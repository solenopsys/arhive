package solechain_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	keepertest "solechain/testutil/keeper"
	"solechain/testutil/nullify"
	"solechain/x/solechain"
	"solechain/x/solechain/types"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.SolechainKeeper(t)
	solechain.InitGenesis(ctx, *k, genesisState)
	got := solechain.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
