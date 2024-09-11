package keeper

import (
	"solechain/x/solechain/types"
)

var _ types.QueryServer = Keeper{}
